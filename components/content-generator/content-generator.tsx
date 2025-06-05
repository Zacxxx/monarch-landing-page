import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { SocialPlatform, PlatformConfig, GeneratedPost, AIPostContent, OutputLength } from './types';
import { AVAILABLE_PLATFORMS, DEFAULT_PERSONA_VALUE, DEFAULT_OBJECTIVE_VALUE, MAX_PERSONAS, DEFAULT_TEMPERATURE } from './constants';
import { generatePostTextContent, generatePostImage } from './services/geminiService';
import PostCard from './components/PostCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';

interface GenerationTarget {
  platform: SocialPlatform;
  countIndex: number; // 0-based index for this platform's configured count
  personaIndex?: number; // 0-based index of the persona in the personas array (if not mixing)
}

const App: React.FC = () => {
  const [personas, setPersonas] = useState<string[]>([DEFAULT_PERSONA_VALUE]);
  const [objective, setObjective] = useState<string>(DEFAULT_OBJECTIVE_VALUE);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Français');
  const [platformConfigs, setPlatformConfigs] = useState<PlatformConfig[]>(
    AVAILABLE_PLATFORMS.map(p => ({ platform: p, count: p === SocialPlatform.Instagram ? 1 : 0, selected: p === SocialPlatform.Instagram }))
  );
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  const [isGeneratingText, setIsGeneratingText] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyStatus, setApiKeyStatus] = useState<string>('');
  const [apiKeyOk, setApiKeyOk] = useState<boolean>(false);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // New states for advanced features
  const [isMixPersonas, setIsMixPersonas] = useState<boolean>(false);
  const [outputLength, setOutputLength] = useState<OutputLength>('Medium');
  const [customInstructions, setCustomInstructions] = useState<string>('');
  const [avoidanceInstructions, setAvoidanceInstructions] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(DEFAULT_TEMPERATURE);
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!process.env.API_KEY) {
        setApiKeyStatus("Clé API non configurée. Veuillez la définir pour utiliser les fonctionnalités Gemini.");
        setApiKeyOk(false);
    } else {
        setApiKeyStatus("Clé API détectée.");
        setApiKeyOk(true);
    }
  }, []);

  const handleAddPersona = () => {
    if (personas.length < MAX_PERSONAS) {
      setPersonas([...personas, '']);
    }
  };

  const handlePersonaChange = (index: number, value: string) => {
    const newPersonas = [...personas];
    newPersonas[index] = value;
    setPersonas(newPersonas);
  };

  const handleRemovePersona = (index: number) => {
    if (personas.length > 1) {
      const newPersonas = personas.filter((_, i) => i !== index);
      setPersonas(newPersonas);
    }
  };
  
  const activePersonas = useMemo(() => personas.filter(p => p.trim() !== ''), [personas]);

  const totalPostsPlanned = useMemo(() => {
    const numActivePersonas = Math.max(1, activePersonas.length); // Treat as 1 if empty, though UI should prevent this.
    return platformConfigs.reduce((sum, pc) => {
      if (pc.selected && pc.count > 0) {
        return sum + (isMixPersonas ? pc.count : pc.count * numActivePersonas);
      }
      return sum;
    }, 0);
  }, [platformConfigs, activePersonas, isMixPersonas]);


  const findNextTextGenerationTarget = useCallback((): GenerationTarget | null => {
    if (activePersonas.length === 0) return null;

    for (const config of platformConfigs) {
      if (config.selected && config.count > 0) {
        for (let i = 0; i < config.count; i++) { // platform count index
          if (isMixPersonas) {
            const postExists = generatedPosts.some(
              p => p.targetPlatform === config.platform && p.targetCountIndex === i && p.targetPersonaDisplayIndex === undefined
            );
            if (!postExists) {
              return { platform: config.platform, countIndex: i };
            }
          } else {
            for (let j = 0; j < activePersonas.length; j++) { // persona index
              const postExists = generatedPosts.some(
                p => p.targetPlatform === config.platform && p.targetCountIndex === i && p.targetPersonaDisplayIndex === j
              );
              if (!postExists) {
                return { platform: config.platform, countIndex: i, personaIndex: j };
              }
            }
          }
        }
      }
    }
    return null;
  }, [platformConfigs, activePersonas, isMixPersonas, generatedPosts]);


  const handleGenerateNextText = useCallback(async () => {
    setError(null);
    if (!apiKeyOk) {
      setError("Clé API non configurée ou invalide. Impossible de générer du contenu.");
      return;
    }

    const target = findNextTextGenerationTarget();
    if (!target) {
      // setError("Plus de posts à générer avec la configuration actuelle ou aucune persona valide.");
      return;
    }
    
    if (activePersonas.length === 0) {
      setError("Veuillez définir au moins une persona cible valide (non vide).");
      return;
    }
    if (!objective.trim()) {
      setError("Veuillez définir l'objectif des posts.");
      return;
    }
    if (!selectedLanguage) {
      setError("Veuillez sélectionner une langue pour le contenu.");
      return;
    }

    setIsGeneratingText(true);
    
    const personaForPrompt = isMixPersonas
      ? activePersonas.join('\n---\n')
      : activePersonas[target.personaIndex!]; // target.personaIndex will exist if !isMixPersonas

    const tempPostId = `post-${target.platform}-${target.countIndex}-persona${target.personaIndex ?? 'mixed'}-${Date.now()}`;
    
    const tempPost: GeneratedPost = {
      id: tempPostId,
      platform: target.platform,
      message: `Génération du texte en ${selectedLanguage.toLowerCase()} pour ${target.platform}${!isMixPersonas ? ` (Persona ${target.personaIndex! + 1})` : ''}...`,
      hashtags: [],
      visualSuggestion: "Chargement...",
      imagePrompt: "",
      imageUrl: null,
      isTextLoading: true,
      isImageLoading: false,
      targetPlatform: target.platform,
      targetCountIndex: target.countIndex,
      targetPersonaDisplayIndex: target.personaIndex,
      targetPersonaText: !isMixPersonas ? activePersonas[target.personaIndex!] : undefined,
    };
    setGeneratedPosts(prevPosts => [tempPost, ...prevPosts].sort((a,b) => b.id.localeCompare(a.id)));

    try {
      const postTextContent: AIPostContent = await generatePostTextContent(
        personaForPrompt,
        objective,
        target.platform,
        selectedLanguage,
        temperature,
        outputLength,
        customInstructions,
        avoidanceInstructions
      );
      
      const newPost: GeneratedPost = {
        ...tempPost,
        message: postTextContent.message,
        hashtags: postTextContent.hashtags,
        visualSuggestion: postTextContent.visualSuggestion,
        imagePrompt: postTextContent.visualSuggestion || `Visuel attrayant pour ${objective} ciblant ${personaForPrompt.substring(0,50)} sur ${target.platform}`,
        isTextLoading: false,
      };
      setGeneratedPosts(prevPosts => prevPosts.map(p => p.id === tempPostId ? newPost : p).sort((a,b) => b.id.localeCompare(a.id)));

    } catch (err) {
      console.error("Erreur durant la génération du texte:", err);
      const errorMsg = err instanceof Error ? err.message : "Une erreur inconnue est survenue durant la génération du texte.";
      setError(errorMsg);
      setGeneratedPosts(prevPosts => prevPosts.map(p => p.id === tempPostId ? {...p, message: `Erreur: ${errorMsg}`, isTextLoading: false, visualSuggestion: 'Génération de texte échouée.' } : p).sort((a,b) => b.id.localeCompare(a.id)));
    } finally {
      setIsGeneratingText(false);
    }
  }, [
    apiKeyOk, objective, selectedLanguage, platformConfigs, generatedPosts, 
    activePersonas, isMixPersonas, temperature, outputLength, customInstructions, avoidanceInstructions, 
    findNextTextGenerationTarget // findNextTextGenerationTarget itself depends on several states
  ]);

  const handleGenerateImage = useCallback(async (postId: string, imagePrompt: string, platform: SocialPlatform) => {
    setError(null);
    if (!apiKeyOk) {
      setError("Clé API non configurée. Impossible de générer une image.");
      return;
    }

    setGeneratedPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? { ...p, isImageLoading: true, imageUrl: null } : p))
    );

    try {
      const fullImagePrompt = `${imagePrompt} (Style pour ${platform})`;
      const imageUrl: string = await generatePostImage(fullImagePrompt, platform);
      setGeneratedPosts(prevPosts =>
        prevPosts.map(p => (p.id === postId ? { ...p, imageUrl, isImageLoading: false } : p))
      );
    } catch (err) {
      console.error(`Erreur durant la génération de l'image pour le post ${postId} (${platform}):`, err);
      const errorMsg = err instanceof Error ? err.message : "Une erreur inconnue est survenue durant la génération de l'image.";
      setError(errorMsg);
      setGeneratedPosts(prevPosts =>
        prevPosts.map(p => (p.id === postId ? { ...p, isImageLoading: false, imageUrl: 'error' } : p))
      );
    }
  }, [apiKeyOk]);

  const handleExportTextPost = useCallback((post: GeneratedPost) => {
    let postContent = `Plateforme: ${post.platform}\n`;
    if (post.targetPersonaDisplayIndex !== undefined) {
      postContent += `Persona Cible: ${post.targetPersonaText || `Persona ${post.targetPersonaDisplayIndex + 1}`}\n`;
    }
    postContent += `\nMessage:\n${post.message}\n\nHashtags:\n${post.hashtags.join(' ')}\n\nSuggestion Visuelle (${post.platform}):\n${post.visualSuggestion}\n\nPrompt utilisé pour l'image (si générée):\n${post.imagePrompt}`;
    
    navigator.clipboard.writeText(postContent)
      .then(() => {
        setCopiedPostId(post.id);
        setTimeout(() => setCopiedPostId(null), 2000);
      })
      .catch(err => {
        console.error("Erreur de copie dans le presse-papier:", err);
        setError("Impossible de copier le contenu. Veuillez réessayer.");
      });
  }, []);


  const handlePlatformSelect = (platform: SocialPlatform, isSelected: boolean) => {
    setPlatformConfigs(prevConfigs =>
      prevConfigs.map(config =>
        config.platform === platform
          ? { ...config, selected: isSelected, count: isSelected ? Math.max(1, config.count) : 0 }
          : config
      )
    );
  };

  const handlePlatformCountChange = (platform: SocialPlatform, count: number) => {
    setPlatformConfigs(prevConfigs =>
      prevConfigs.map(config =>
        config.platform === platform ? { ...config, count: Math.max(0, count) } : config
      )
    );
  };

  const handleResetAll = () => {
    setPersonas([DEFAULT_PERSONA_VALUE]);
    setObjective(DEFAULT_OBJECTIVE_VALUE);
    setSelectedLanguage('Français');
    setPlatformConfigs(
      AVAILABLE_PLATFORMS.map(p => ({ platform: p, count: p === SocialPlatform.Instagram ? 1 : 0, selected: p === SocialPlatform.Instagram }))
    );
    setGeneratedPosts([]);
    setError(null);
    setIsMixPersonas(false);
    setOutputLength('Medium');
    setCustomInstructions('');
    setAvoidanceInstructions('');
    setTemperature(DEFAULT_TEMPERATURE);
    setAdvancedOptionsOpen(false);
    setCopiedPostId(null);
  };
  
  const nextTargetForText = findNextTextGenerationTarget();
  const totalSuccessfullyGeneratedText = generatedPosts.filter(p => !p.isTextLoading && !p.message.startsWith("Erreur:") && !p.message.startsWith("Génération du texte")).length;


  const getButtonText = () => {
    if (isGeneratingText) return "Génération du texte...";
    if (!apiKeyOk) return "Clé API requise";
    if (activePersonas.length === 0) return "Ajouter une persona valide";
    if (!objective.trim()) return "Définir un objectif";
    if (!selectedLanguage) return "Choisir une langue";

    if (nextTargetForText) {
      const platformConfig = platformConfigs.find(pc => pc.platform === nextTargetForText.platform);
      let targetText = `Générer Texte pour ${nextTargetForText.platform} (${nextTargetForText.countIndex + 1}/${platformConfig?.count})`;
      if (!isMixPersonas && nextTargetForText.personaIndex !== undefined) {
        targetText += ` - Persona ${nextTargetForText.personaIndex + 1}`;
      }
      return targetText;
    }
    if (totalPostsPlanned > 0 && totalSuccessfullyGeneratedText === totalPostsPlanned) return "Tous les textes générés";
    if (totalPostsPlanned === 0) return "Aucun post configuré";
    return "Configurer les posts et objectifs";
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-4 sm:p-8 selection:bg-neutral-500 selection:text-neutral-100">
      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">
            Social Post Genie
          </h1>
          <p className="text-lg text-neutral-400">Création de contenu IA pour vos réseaux sociaux.</p>
          {apiKeyStatus && (
            <p className={`text-sm mt-2 ${!apiKeyOk ? 'text-yellow-400' : 'text-green-400'}`}>
              {!apiKeyOk ? '⚠️ ' : '✓ '} {apiKeyStatus}
            </p>
          )}
        </header>
        
        <div className="text-right mb-6">
            <button
              type="button"
              onClick={handleResetAll}
              className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-medium py-2 px-4 rounded-lg shadow text-sm transition-colors duration-150"
            >
              Réinitialiser Tout
            </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleGenerateNextText();}} className="bg-neutral-900 shadow-2xl rounded-xl p-6 sm:p-8 mb-12 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
                <label htmlFor="personas" className="block text-lg font-semibold text-neutral-100">
                Personas Cibles ({personas.length}/{MAX_PERSONAS})
                </label>
                <div className="flex items-center">
                    <label htmlFor="mixPersonas" className="text-sm text-neutral-300 mr-2">Mixer Personas :</label>
                    <input
                        type="checkbox"
                        id="mixPersonas"
                        checked={isMixPersonas}
                        onChange={(e) => setIsMixPersonas(e.target.checked)}
                        className="h-5 w-5 text-neutral-300 bg-neutral-700 border-neutral-600 rounded focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                    />
                </div>
            </div>
            {personas.map((persona, index) => (
              <div key={index} className="mb-3 relative">
                <textarea
                  id={`persona-${index}`}
                  value={persona}
                  onChange={(e) => handlePersonaChange(index, e.target.value)}
                  rows={index === 0 ? 3 : 2}
                  className="w-full p-3 pr-10 bg-neutral-800 border border-neutral-700 rounded-md shadow-sm focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 text-neutral-100 placeholder-neutral-500"
                  placeholder={`Persona ${index + 1}... Ex : ${DEFAULT_PERSONA_VALUE}`}
                  required={index === 0} 
                  aria-required={index === 0}
                />
                {personas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePersona(index)}
                    className="absolute top-2 right-2 text-neutral-400 hover:text-red-400 p-1"
                    aria-label={`Supprimer persona ${index + 1}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            {personas.length < MAX_PERSONAS && (
              <button
                type="button"
                onClick={handleAddPersona}
                className="text-sm text-neutral-300 hover:text-white bg-neutral-700 hover:bg-neutral-600 px-3 py-1.5 rounded-md transition-colors"
              >
                + Ajouter Persona
              </button>
            )}
          </div>

          <div>
            <label htmlFor="objective" className="block text-lg font-semibold text-neutral-100 mb-2">
              Objectif des Posts
            </label>
            <input
              type="text"
              id="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-md shadow-sm focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 text-neutral-100 placeholder-neutral-500"
              placeholder="Ex : Générer du trafic, annoncer un produit..."
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-lg font-semibold text-neutral-100 mb-2">
              Langue du Contenu
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-md shadow-sm focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 text-neutral-100"
              required
              aria-required="true"
            >
              <option value="Français">Français</option>
              <option value="English">English</option>
            </select>
          </div>

          {/* Advanced Options Collapsible */}
          <details className="group" onToggle={(e) => setAdvancedOptionsOpen((e.target as HTMLDetailsElement).open)}>
            <summary className="list-none flex items-center justify-between cursor-pointer text-lg font-semibold text-neutral-100 hover:text-neutral-300 py-2">
              Options Avancées
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition-transform duration-200 ${advancedOptionsOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div className="mt-4 space-y-6 bg-neutral-850 p-4 rounded-md border border-neutral-700">
              <div>
                <label htmlFor="outputLength" className="block text-sm font-medium text-neutral-300 mb-1">Longueur du Message</label>
                <select 
                    id="outputLength" 
                    value={outputLength} 
                    onChange={(e) => setOutputLength(e.target.value as OutputLength)}
                    className="w-full p-2.5 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-100 focus:ring-1 focus:ring-neutral-500"
                >
                  <option value="Short">Court</option>
                  <option value="Medium">Moyen</option>
                  <option value="Long">Long</option>
                </select>
              </div>
              <div>
                <label htmlFor="customInstructions" className="block text-sm font-medium text-neutral-300 mb-1">Instructions Supplémentaires (optionnel)</label>
                <textarea 
                    id="customInstructions" 
                    value={customInstructions} 
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-100 placeholder-neutral-500 focus:ring-1 focus:ring-neutral-500"
                    placeholder="Ex : Utiliser un ton humoristique, inclure un appel à l'action spécifique..."
                />
              </div>
              <div>
                <label htmlFor="avoidanceInstructions" className="block text-sm font-medium text-neutral-300 mb-1">À Éviter (optionnel)</label>
                <textarea 
                    id="avoidanceInstructions" 
                    value={avoidanceInstructions} 
                    onChange={(e) => setAvoidanceInstructions(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-100 placeholder-neutral-500 focus:ring-1 focus:ring-neutral-500"
                    placeholder="Ex : Ne pas mentionner la concurrence, éviter les superlatifs..."
                />
              </div>
              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-neutral-300 mb-1">
                  Température (Créativité) : <span className="font-semibold">{temperature.toFixed(1)}</span>
                </label>
                <input 
                    type="range" 
                    id="temperature" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={temperature} 
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-2 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-neutral-300"
                />
              </div>
            </div>
          </details>


          <div>
            <h3 className="text-lg font-semibold text-neutral-100 mb-3">Plateformes <span className="text-sm text-neutral-400 font-normal">(posts prévus: {totalPostsPlanned}, textes générés: {totalSuccessfullyGeneratedText})</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {platformConfigs.map(config => (
                <div key={config.platform} className="bg-neutral-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <label htmlFor={`platform-${config.platform}`} className="font-medium text-neutral-100">
                      {config.platform}
                    </label>
                    <input
                      type="checkbox"
                      id={`platform-${config.platform}`}
                      checked={config.selected}
                      onChange={(e) => handlePlatformSelect(config.platform, e.target.checked)}
                      className="h-5 w-5 text-neutral-300 bg-neutral-700 border-neutral-600 rounded focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
                      aria-labelledby={`platform-label-${config.platform}`}
                    />
                    <span id={`platform-label-${config.platform}`} className="sr-only">Sélectionner {config.platform}</span>
                  </div>
                  {config.selected && (
                    <input
                      type="number"
                      min="0"
                      value={config.count}
                      onChange={(e) => handlePlatformCountChange(config.platform, parseInt(e.target.value, 10))}
                      className="w-full p-2 mt-1 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-100 focus:ring-1 focus:ring-neutral-500 placeholder-neutral-500"
                      placeholder="Nb. posts"
                      aria-label={`Nombre de posts pour ${config.platform}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {error && <ErrorAlert message={error} />}

          <button
            type="submit"
            disabled={isGeneratingText || !apiKeyOk || !nextTargetForText || activePersonas.length === 0 || !objective.trim() || !selectedLanguage}
            className="w-full bg-white text-neutral-900 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-neutral-100 transition-all duration-300 ease-in-out disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed flex items-center justify-center"
            aria-live="polite"
          >
            {isGeneratingText ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {getButtonText()}
              </>
            ) : (
              getButtonText()
            )}
          </button>
        </form>

        {(isGeneratingText && generatedPosts.filter(p => p.isTextLoading).length > 0 && totalSuccessfullyGeneratedText === 0) && <LoadingSpinner />}
        
        {generatedPosts.length > 0 && (
          <section aria-labelledby="generated-posts-title">
            <h2 id="generated-posts-title" className="text-3xl font-semibold text-white mb-8 text-center">
              Posts Générés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generatedPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onGenerateImage={handleGenerateImage}
                  onExportText={handleExportTextPost}
                  isCopied={copiedPostId === post.id}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default App;