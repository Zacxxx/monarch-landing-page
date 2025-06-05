import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section';

interface ProjectShowcaseSectionProps {
  id: string;
}

const ProjectShowcaseSection: React.FC<ProjectShowcaseSectionProps> = ({ id }) => {
  return (
    <Section id={id} contentAlignment="left" className="bg-anim-project-showcase">
      <div className="max-w-4xl w-full">
        <h2
          className="font-header text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none mb-8 sm:mb-12"
        >
          <span className="text-foreground">INITIATIVE: </span><span className="text-accent">ALPHA</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden shadow-2xl group">
            <video 
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              poster="/logo.png"
            >
              <source src="/alpha.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <p className="absolute bottom-4 left-4 text-xs text-muted-foreground group-hover:text-accent transition-colors bg-black/50 px-2 py-1 rounded">Monarch Innovations / Project Alpha Preview</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl text-foreground mb-4 leading-relaxed">
              An <span className="text-primary font-medium">avant-garde</span> exploration into next-generation paradigms. This initiative <span className="text-accent font-medium">redefines</span> boundaries and unlocks unparalleled potential through synergistic innovation.
            </p>
            <p className="text-md text-muted-foreground mb-6">
              Delve into the core mechanics and discover the transformative power of Project Alpha, designed to integrate seamlessly and elevate operational efficiency.
            </p>
            <Link
              to="/alpha"
              className="inline-block text-primary hover:text-primary-foreground border border-primary hover:bg-primary/90 rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectShowcaseSection;