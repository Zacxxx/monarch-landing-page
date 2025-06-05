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
        <img 
          src="/logo.png" 
          alt="Monarch Logo" 
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-90 object-contain"
        />
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