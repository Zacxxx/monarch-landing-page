import React from 'react';
import { GeneratedPost } from '../types';

interface PostCardProps {
  post: GeneratedPost;
  onGenerateImage: (postId: string, imagePrompt: string, platform: string) => void;
  onExportText: (post: GeneratedPost) => void;
  isCopied: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onGenerateImage, onExportText, isCopied }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(post.visualSuggestion || post.id)}/600/400?grayscale&text=Load+Error`;
    e.currentTarget.alt = "Erreur de chargement de l'image. Image de remplacement affichée.";
  };
  
  const handleExportImage = () => {
    if (post.imageUrl && post.imageUrl !== 'error' && !post.imageUrl.startsWith('https://picsum.photos')) {
      const link = document.createElement('a');
      link.href = post.imageUrl;
      const messageStart = post.message.split(/\s+/).slice(0,5).join('_').toLowerCase().replace(/[^a-z0-9_]/g, '');
      const filename = `${post.platform.toLowerCase()}_${messageStart || 'post'}_${new Date().toISOString().split('T')[0]}.jpeg`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <article className="bg-white text-neutral-900 shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-[1.02] duration-300 ease-in-out flex flex-col relative">
      {post.isTextLoading ? (
        <div className="w-full h-64 bg-neutral-200 flex items-center justify-center p-4 text-center">
          <svg className="animate-spin h-10 w-10 text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-3 text-neutral-600 font-medium">Chargement du texte pour {post.platform}...</span>
        </div>
      ) : post.isImageLoading ? (
        <div className="w-full h-64 bg-neutral-200 flex flex-col items-center justify-center p-4 text-center">
           <svg className="animate-spin h-10 w-10 text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="mt-2 text-sm text-neutral-600 font-medium">Génération de l'image pour {post.platform}...</span>
        </div>
      ) : post.imageUrl && post.imageUrl !== 'error' && !post.imageUrl.startsWith('https://picsum.photos') ? (
        <img 
          src={post.imageUrl} 
          alt={post.visualSuggestion || `Visuel pour ${post.platform}`} 
          className="w-full h-64 object-cover" 
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-64 bg-neutral-300 flex flex-col items-center justify-center p-4 text-center">
          {post.imageUrl === 'error' && <p className="text-red-600 text-sm mb-2 font-semibold">Erreur de génération d'image.</p>}
           {!post.message.startsWith("Erreur:") && (
            <>
              <p className="text-sm text-neutral-700 mb-3">Prêt à générer une image basée sur la suggestion visuelle pour {post.platform} ?</p>
              <button
                onClick={() => onGenerateImage(post.id, post.imagePrompt, post.platform)}
                disabled={post.isImageLoading || post.isTextLoading}
                className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-150 disabled:opacity-50"
              >
                Générer l'Image
              </button>
            </>
           )}
           {post.message.startsWith("Erreur:") && (
             <p className="text-sm text-neutral-700">La génération de texte a échoué. Impossible de générer une image.</p>
           )}
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full self-start ${post.isTextLoading || post.message.startsWith("Erreur:") ? 'bg-neutral-100 text-neutral-500' : 'bg-neutral-200 text-neutral-700'}`}>
            {post.platform}
          </span>
          {post.targetPersonaDisplayIndex !== undefined && (
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
              Persona {post.targetPersonaDisplayIndex + 1}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-2 sr-only">Message du post</h3>
        <p className={`text-neutral-700 text-sm mb-4 whitespace-pre-wrap flex-grow ${post.isTextLoading || post.message.startsWith("Erreur:") ? 'italic text-neutral-500' : ''}`}>
          {post.message}
        </p>
        
        {!(post.isTextLoading || post.message.startsWith("Erreur:")) && (
          <div className="mt-auto pt-4 border-t border-neutral-200">
            <h4 className="text-sm font-semibold text-neutral-700 mb-1">Hashtags :</h4>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.hashtags.map((tag, index) => (
                <span key={index} className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h4 className="text-sm font-semibold text-neutral-700 mb-1">Suggestion Visuelle ({post.platform}) :</h4>
            <p className="text-neutral-600 text-xs italic mb-4">{post.visualSuggestion}</p>

            <div className="flex flex-col sm:flex-row items-center gap-2 mt-3">
              <button
                onClick={() => onExportText(post)}
                disabled={post.isTextLoading}
                className="w-full sm:w-auto flex-1 bg-neutral-600 hover:bg-neutral-500 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors duration-150 disabled:opacity-50 text-center"
              >
                {isCopied ? 'Copié !' : 'Exporter Texte'}
              </button>
              {post.imageUrl && post.imageUrl !== 'error' && !post.imageUrl.startsWith('https://picsum.photos') && !post.isImageLoading && (
                <button
                  onClick={handleExportImage}
                  disabled={post.isImageLoading}
                  className="w-full sm:w-auto flex-1 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors duration-150 disabled:opacity-50 text-center"
                >
                  Exporter Image
                </button>
              )}
            </div>
          </div>
        )}
         {(post.message.startsWith("Erreur:") && !post.isTextLoading) && (
            <p className="text-xs text-red-500 mt-auto pt-2 border-t border-neutral-200">Impossible d'exporter ce post en raison d'une erreur de génération de texte.</p>
        )}
      </div>
    </article>
  );
};

export default PostCard;