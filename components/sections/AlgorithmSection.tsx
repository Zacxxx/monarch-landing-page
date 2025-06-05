
import React from 'react';
import Section from '../Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface AlgorithmSectionProps {
  id: string;
}

const techAbilities = [
  "Machine Learning", "Deep Learning", "Neural Networks",
  "Quantum Computing", "Data Weaving", "Predictive Analytics",
  "Cybernetic Synergy", "Autonomous Systems", "Edge AI",
  "Natural Language Processing", "Computer Vision", "Reinforcement Learning",
  "AI Ethics Frameworks", "Scalable Architectures", "Hyper-Automation",
  "Cognitive Emulation Architectures", "Neuro-Symbolic Reasoning Grids",
  "Exascale Federated Learning", "Bio-Algorithmic Convergence",
  "Swarm Intelligence Orchestration", "Predictive Geopolitical Modeling",
  "Quantum-Enhanced Optimization", "Hyper-Personalized Reality Design",
  "Digital Sentience Engineering", "Self-Evolving Governance AI",
  "Adaptive Societal Infrastructure", "Universal Semantic Translation",
  "Exo-Climatic Algorithmic Forecasting", "Computational Creativity Engines",
  "Decentralized Autonomous Organizations (DAO) Governance"
];

const AlgorithmTitleBlock: React.FC = () => (
  <div className="algorithm-text-glitch inline-block mx-4 flex-shrink-0"> {/* mx-4 for spacing, flex-shrink-0 to maintain size */}
    <h2
      className="font-extrabold tracking-tighter leading-none text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] text-foreground font-mono"
      data-glitch="ALGORITHM"
    >
      <span>ALGORITHM</span>ALGORITHM<span>ALGORITHM</span>
    </h2>
  </div>
);

const AlgorithmSection: React.FC<AlgorithmSectionProps> = ({ id }) => {
  const titleContainerRef = useScrollAnimation({ animationClass: 'scroll-animate-fade-in', triggerOnce: true });
  const techShowcaseRef = useScrollAnimation({ animationClass: 'scroll-animate-slide-up fast', delay: 200, triggerOnce: true });

  return (
    <Section id={id} contentAlignment="center" className="bg-anim-algorithm font-mono">
      {/* Grid overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.07] grid grid-cols-8 grid-rows-8 pointer-events-none">
        {[...Array(64)].map((_, i) => (
          <div key={i} className="border border-foreground/20"></div>
        ))}
      </div>

      {/* Scrolling Marquee Title */}
      <div ref={titleContainerRef} className="relative z-10 w-full overflow-hidden mb-12 sm:mb-16 md:mb-20">
        <div className="marquee-track"> {/* This div gets the animation and display:flex */}
          <AlgorithmTitleBlock />
          <AlgorithmTitleBlock />
          {/* Adding a third block ensures smoother looping on very wide displays with the new LTR animation */}
          <AlgorithmTitleBlock /> 
        </div>
      </div>

      {/* Tech Abilities Showcase */}
      <div ref={techShowcaseRef} className="relative z-10 max-w-4xl w-full">
        <h3 className="text-2xl sm:text-3xl text-primary font-semibold mb-6 sm:mb-8 text-center">Core Capabilities</h3>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 px-4">
          {techAbilities.map((tech, index) => (
            <div
              key={index}
              className="tech-showcase-item scroll-animate scroll-animate-fade-in"
              style={{ transitionDelay: `${index * 50}ms` }} // Staggered animation for items
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AlgorithmSection;
