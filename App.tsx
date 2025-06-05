import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EvolveSection from './components/sections/EvolveSection';
import ProjectShowcaseSection from './components/sections/ProjectShowcaseSection';
import VoidSection from './components/sections/VoidSection';
import NexusSection from './components/sections/NexusSection';
import AlgorithmSection from './components/sections/AlgorithmSection';
import SingularitySection from './components/sections/SingularitySection';
import HorizonSection from './components/sections/HorizonSection';
import IgniteSection from './components/sections/IgniteSection';

// Ensure hooks path is correct if you place useScrollAnimation.ts in a subfolder like 'hooks'
// For this example, assuming it's accessible via '@/hooks/useScrollAnimation' or similar
// based on your tsconfig paths if you have them. If not, use relative paths.
// import useScrollAnimation from './hooks/useScrollAnimation'; 

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background"> {/* Changed from bg-slate-950, now uses CSS var */}
      <Header />
      <main className="flex-grow">
        <EvolveSection id="hero" />
        <ProjectShowcaseSection id="project-showcase" />
        <VoidSection id="void" />
        <NexusSection id="nexus" />
        <AlgorithmSection id="algorithm" />
        <SingularitySection id="singularity" />
        <HorizonSection id="horizon" />
        <IgniteSection id="contact" />
      </main>
      <Footer />
    </div>
  );
};

export default App;