import React from 'react';
import Section from '../Section';
import useScrollAnimation from '../../hooks/useScrollAnimation'; // Adjusted path

interface HorizonSectionProps {
  id: string;
}

const HorizonSection: React.FC<HorizonSectionProps> = ({ id }) => {
  const titleRef = useScrollAnimation({ animationClass: 'scroll-animate-slide-up fast', triggerOnce: true, threshold: 0.3 });

  return (
    <Section 
      id={id} 
      contentAlignment="left" 
      className="bg-gradient-to-br from-background via-secondary to-accent/20 bg-anim-horizon"
    >
      <h2
        ref={titleRef}
        className="font-header text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-primary font-extrabold tracking-tighter leading-none horizon-text-parallax"
      >
        HORIZON
      </h2>
    </Section>
  );
};

export default HorizonSection;