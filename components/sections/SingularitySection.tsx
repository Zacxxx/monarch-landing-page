import React from 'react';
import Section from '../Section';
import useScrollAnimation from '../../hooks/useScrollAnimation'; 

interface SingularitySectionProps {
  id: string;
}

const SingularitySection: React.FC<SingularitySectionProps> = ({ id }) => {
  const titleRef = useScrollAnimation({ animationClass: 'scroll-animate-fade-in', triggerOnce: true, threshold: 0.3 });

  return (
    <Section id={id} contentAlignment="center" className="bg-anim-singularity">
      <h2
        ref={titleRef}
        className="font-header text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-foreground font-extrabold tracking-tighter leading-none singularity-text-focus"
      >
        SINGUL<span className="text-accent">A</span>RITY
      </h2>
    </Section>
  );
};

export default SingularitySection;