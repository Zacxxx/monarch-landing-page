import React from 'react';
import Section from '../Section';

interface IgniteSectionProps {
  id: string;
}

const IgniteSection: React.FC<IgniteSectionProps> = ({ id }) => {
  return (
    <Section id={id} contentAlignment="center" className="bg-background group bg-anim-ignite">
      <h2
        className="font-header font-extrabold tracking-tighter leading-none text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-primary group-hover:text-accent transition-colors duration-300 cursor-default ignite-title-glow"
        style={{ outline: 'none' }}
      >
        IGNIT<span className="text-destructive group-hover:text-accent transition-colors duration-150">E</span>
      </h2>
      <a
        href="mailto:contact@monarch.com"
        className="mt-8 sm:mt-12 text-xl sm:text-2xl lg:text-3xl text-foreground group-hover:text-primary border-2 border-border group-hover:border-primary rounded-full px-8 py-3 sm:px-12 sm:py-4 transition-all duration-300 ignite-button-enhanced focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Connect Potential
      </a>
    </Section>
  );
};

export default IgniteSection;