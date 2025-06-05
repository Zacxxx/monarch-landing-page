import React from 'react';
import Section from '../Section';

interface AlgorithmSectionProps {
  id: string;
}

const techAbilities = [
  "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
  "Reinforcement Learning", "Neural Networks", "Transformer Models", "PyTorch", "TensorFlow",
  "Scikit-Learn", "Pandas", "NumPy", "Kubernetes", "Docker", "AWS", "GCP", "Azure",
  "MLOps", "Data Engineering", "Big Data", "Apache Spark", "Hadoop", "MongoDB", "PostgreSQL"
];

const AlgorithmSection: React.FC<AlgorithmSectionProps> = ({ id }) => {
  return (
    <Section id={id} contentAlignment="center" className="bg-anim-algorithm font-mono">
      {/* Grid overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.07] grid grid-cols-8 grid-rows-8 pointer-events-none">
        {[...Array(64)].map((_, i) => (
          <div key={i} className="border border-foreground/20"></div>
        ))}
      </div>

      {/* Static Title */}
      <div className="relative z-10 w-full mb-12 sm:mb-16 md:mb-20">
        <h2 className="font-extrabold tracking-tighter leading-none text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] text-foreground font-mono algorithm-text-glitch">
          ALGORITHM
        </h2>
      </div>

      {/* Tech Abilities Showcase */}
      <div className="relative z-10 max-w-4xl w-full">
        <h3 className="text-2xl sm:text-3xl text-primary font-semibold mb-6 sm:mb-8 text-center">Core Capabilities</h3>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 px-4">
          {techAbilities.map((tech, index) => (
            <div
              key={index}
              className="tech-showcase-item"
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
