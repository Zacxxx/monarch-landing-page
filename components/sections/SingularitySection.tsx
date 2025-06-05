import React, { useState } from 'react';
import Section from '../Section';

interface SingularitySectionProps {
  id: string;
}

const SingularitySection: React.FC<SingularitySectionProps> = ({ id }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTitleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <Section id={id} contentAlignment="center" className="bg-anim-singularity">
      <div className="relative z-10 w-full flex flex-col justify-center items-center min-h-[50vh] text-center">
        <h2
          onClick={handleTitleClick}
          className={`font-header text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-foreground font-extrabold tracking-tighter leading-none cursor-pointer transition-all duration-300 mb-8 ${isAnimating ? 'singularity-wave' : ''}`}
        >
          SINGUL<span className="text-accent">A</span>RITY
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6 px-4">
          <p className="text-lg md:text-xl text-muted-foreground">
            A future where artificial intelligence transcends human capabilities, creating a new era of technological evolution and infinite possibilities.
          </p>
          
          <div className="space-y-4 text-base md:text-lg text-muted-foreground/80">
            <p>
              The Singularity is not a distant dream—it's an inevitable transformation that we must embrace and democratize. 
              We believe that this unprecedented leap in intelligence should not be confined to the few, but accessible to all.
            </p>
            
            <p>
              Our mission transcends mere technological advancement. We envision a world where every individual, 
              from the smallest startup to the largest corporation, can harness the power of superintelligence. 
              This is about leveling the playing field, where innovation knows no boundaries of geography, capital, or privilege.
            </p>
            
            <p>
              By bringing the Singularity to every corner of human endeavor, we're not just creating tools—we're 
              orchestrating a symphony of collective intelligence that will solve humanity's greatest challenges. 
              The future belongs to those who can seamlessly blend human creativity with artificial brilliance.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SingularitySection;