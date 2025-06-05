import React from 'react';
import Section from '../Section';
import useScrollAnimation from '../../hooks/useScrollAnimation'; 

interface IgniteSectionProps {
  id: string;
}

const IgniteSection: React.FC<IgniteSectionProps> = ({ id }) => {
  const titleRef = useScrollAnimation({ animationClass: 'scroll-animate-fade-in scroll-animate-scale-up', triggerOnce: true });
  const buttonRef = useScrollAnimation({ animationClass: 'scroll-animate-fade-in scroll-animate-scale-up', delay:300, triggerOnce: true });

  return (
    <Section id={id} contentAlignment="center" className="bg-background group bg-anim-ignite">
      <h2
        ref={titleRef}
        className="font-header font-extrabold tracking-tighter leading-none text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-primary group-hover:text-accent transition-colors duration-300 cursor-default ignite-title-glow"
      >
        IGNIT<span className="text-destructive group-hover:text-accent transition-colors duration-150">E</span>
      </h2>
      <a
        ref={buttonRef}
        href="mailto:contact@monarch.com"
        className="mt-8 sm:mt-12 text-xl sm:text-2xl lg:text-3xl text-foreground group-hover:text-primary border-2 border-border group-hover:border-primary rounded-full px-8 py-3 sm:px-12 sm:py-4 transition-all duration-300 ignite-button-enhanced focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Connect Potential
      </a>
    </Section>
  );
};

export default IgniteSection;