import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EvolveSection from './components/sections/EvolveSection';
import ProjectShowcaseSection from './components/sections/ProjectShowcaseSection';
import VoidSection from './components/sections/VoidSection';
import NexusSection from './components/sections/NexusSection';
import AlgorithmSection from './components/sections/AlgorithmSection';
import SingularitySection from './components/sections/SingularitySection';
import IgniteSection from './components/sections/IgniteSection';
import AlphaPage from './components/pages/AlphaPage';

// Ensure hooks path is correct if you place useScrollAnimation.ts in a subfolder like 'hooks'
// For this example, assuming it's accessible via '@/hooks/useScrollAnimation' or similar
// based on your tsconfig paths if you have them. If not, use relative paths.
// import useScrollAnimation from './hooks/useScrollAnimation'; 

// Home page component
const HomePage: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-background"> {/* Changed from bg-slate-950, now uses CSS var */}
    <Header />
    <main className="flex-grow">
      <EvolveSection id="hero" />
      <ProjectShowcaseSection id="project-showcase" />
      <VoidSection id="void" />
      <NexusSection id="nexus" />
      <AlgorithmSection id="algorithm" />
      <SingularitySection id="singularity" />
      <IgniteSection id="contact" />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alpha" element={<AlphaPage />} />
      </Routes>
    </Router>
  );
};

export default App;