import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const AlphaPage: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [amount, setAmount] = useState(50000);
  
  const calculateReturns = (years: number, principal: number) => {
    const rates = { 3: 0.02, 5: 0.05, 10: 0.12, 15: 0.20 };
    const rate = rates[years as keyof typeof rates] || 0.12;
    return Math.round(principal * Math.pow(1 + rate, years));
  };

  const finalAmount = calculateReturns(selectedDuration, amount);
  const gain = finalAmount - amount;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-transparent to-green-600/5"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">
            <div className="mb-6">
              <img src="/logo-ca.PNG" alt="Crédit Agricole" className="h-12 mx-auto mb-4 object-contain" />
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                PROJECT ALPHA - 131 ans d'expertise + IA
              </div>
            </div>
            
            <h1 className="font-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-8 text-gray-900">
              <span className="text-green-600">TOUTE UNE INTELLIGENCE</span><br />
              <span className="text-gray-900">POUR VOUS</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed">
              "Nous sommes la banque mutualiste qui allie 131 ans d'expertise humaine à l'intelligence artificielle pour optimiser chacun de vos projets de vie"
            </p>
            
            <p className="text-lg text-green-600 font-semibold mb-12">
              Votre banque, votre conseiller, votre IA
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mutualisme augmenté</h3>
                <p className="text-gray-600 text-sm">Vos données + notre IA = bénéfice collectif</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Proximité intelligente</h3>
                <p className="text-gray-600 text-sm">Conseiller humain + assistant IA 24/7</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Accompagnement prédictif</h3>
                <p className="text-gray-600 text-sm">Nous anticipons vos besoins avant vous</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Deposit Calculator Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                L'épargne réinventée par l'IA
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                131 ans d'expertise + IA = Votre épargne qui grandit vraiment
              </p>
              <div className="inline-block bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  🎯 Taux IA exceptionnels : 3 ans → 2% | 5 ans → 5% | 10 ans → 12% | 15 ans → 20%
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Calculator */}
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-xl border border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Simulateur IA</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant à placer
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="10000"
                        max="200000"
                        step="5000"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center mt-2 text-lg font-semibold text-green-600">
                        {amount.toLocaleString('fr-FR')} €
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Durée de placement
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[3, 5, 10, 15].map((years) => (
                        <button
                          key={years}
                          onClick={() => setSelectedDuration(years)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            selectedDuration === years
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                          }`}
                        >
                          {years} ans
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-green-600 text-white rounded-xl">
                  <div className="text-center">
                    <div className="text-sm opacity-90 mb-1">Votre capital final</div>
                    <div className="text-3xl font-bold mb-2">
                      {finalAmount.toLocaleString('fr-FR')} €
                    </div>
                    <div className="text-sm opacity-90">
                      Gain: +{gain.toLocaleString('fr-FR')} € ({Math.round((gain/amount)*100)}%)
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-white text-green-600 font-semibold py-3 px-6 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors">
                  Souscrire maintenant
                </button>
              </div>

              {/* Comparison */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Comparaison épargne traditionnelle</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <div className="font-medium text-gray-900">Livret A classique</div>
                      <div className="text-sm text-gray-600">3% sur {selectedDuration} ans</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">
                        {Math.round(amount * Math.pow(1.03, selectedDuration)).toLocaleString('fr-FR')} €
                      </div>
                      <div className="text-sm text-red-600">
                        +{Math.round(amount * (Math.pow(1.03, selectedDuration) - 1)).toLocaleString('fr-FR')} €
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-medium text-gray-900">Compte IA Crédit Agricole</div>
                      <div className="text-sm text-gray-600">{selectedDuration === 3 ? '2%' : selectedDuration === 5 ? '5%' : selectedDuration === 10 ? '12%' : '20%'} sur {selectedDuration} ans</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {finalAmount.toLocaleString('fr-FR')} €
                      </div>
                      <div className="text-sm text-green-600">
                        +{gain.toLocaleString('fr-FR')} €
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="font-semibold text-green-800 mb-2">
                    Différence avec l'IA : +{(gain - Math.round(amount * (Math.pow(1.03, selectedDuration) - 1))).toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-sm text-green-700">
                    Soit {Math.round(((finalAmount / (amount * Math.pow(1.03, selectedDuration))) - 1) * 100)}% de performance supplémentaire
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Persona Sophie Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Sophie Martin</h3>
                      <p className="text-gray-600">42 ans, Responsable RH, Nantes</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="text-gray-700 italic">
                        "L'IA m'intéresse si elle me simplifie la vie et optimise mes projets familiaux"
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">Situation</div>
                        <div className="text-gray-600">Mariée, 2 enfants</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Revenus couple</div>
                        <div className="text-gray-600">125k€/an</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Épargne actuelle</div>
                        <div className="text-gray-600">120k€</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Objectif</div>
                        <div className="text-gray-600">Études enfants</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Cas client : Comment Sophie optimise l'avenir de ses enfants
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Objectif : Études supérieures (8-10 ans)</h4>
                    <div className="text-gray-600">Besoin estimé : 60,000€</div>
                    <div className="mt-3 p-3 bg-green-50 rounded">
                      <div className="text-green-800 font-medium">Solution IA : 80,000€ → 248,000€</div>
                      <div className="text-sm text-green-700">Plus de 4x l'objectif initial !</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">Avantages personnalisés</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Accompagnement conseiller + IA 24/7
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Optimisation automatique du placement
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Alertes prédictives sur les échéances
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Security Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Sécurité & Éthique IA
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">IA Certifiée</h3>
                <p className="text-gray-600 text-sm">Données protégées, décisions explicables</p>
              </div>
              
              <div className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comité d'Éthique</h3>
                <p className="text-gray-600 text-sm">Avec représentants sociétaires</p>
              </div>
              
              <div className="p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparence</h3>
                <p className="text-gray-600 text-sm">Droit à l'explication sur chaque recommandation</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Performance démontrée
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">+23%</div>
                  <div className="text-sm text-green-700">Taux d'épargne optimisés vs calculs traditionnels</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">4.7/5</div>
                  <div className="text-sm text-green-700">Satisfaction client IA sur 50,000 utilisateurs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">0</div>
                  <div className="text-sm text-green-700">Erreur de calcul depuis le lancement</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à faire fructifier votre épargne avec l'IA ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez les 2,847 clients de votre région qui ont déjà choisi l'intelligence artificielle
            </p>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button className="w-full sm:w-auto bg-white text-green-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Simuler mon épargne IA
              </button>
              <button className="w-full sm:w-auto border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-green-600 transition-colors">
                Prendre rendez-vous conseiller
              </button>
            </div>
            
            <div className="mt-8 text-sm opacity-75">
              🎁 Offre de lancement : Frais d'ouverture offerts pour les 500 premiers souscripteurs
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlphaPage; 