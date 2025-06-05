import React, { useState } from 'react';
import Section from '../Section';
import InteractiveGridBackground from '../InteractiveGridBackground'; 

interface EvolveSectionProps {
  id: string;
}

const EvolveSection: React.FC<EvolveSectionProps> = ({ id }) => {
  const [apotheosisTriggered, setApotheosisTriggered] = useState(0); // Use a counter to re-trigger

  const handleEvolveClick = () => {
    setApotheosisTriggered(prev => prev + 1); // Increment to trigger effect in child
  };

  return (
    <Section id={id} contentAlignment="center" className="relative">
      <InteractiveGridBackground triggerApotheosis={apotheosisTriggered} />
      
      <div className="mb-6 sm:mb-8" style={{ animation: 'gentleFloat 6s infinite ease-in-out', filter: 'drop-shadow(0 0 8px hsl(var(--primary)/0.3))' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="M12 11l0 6"></path>
            <path d="M9 14l6 0"></path>
        </svg>
      </div>
      <h2
        className="font-header text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-foreground font-extrabold tracking-tighter leading-none py-4 md:py-8 cursor-pointer hover:text-primary transition-colors duration-300" 
        onClick={handleEvolveClick}
        title="Click to activate"
      >
        EVOLVE
      </h2>
    </Section>
  );
};

export default EvolveSection;