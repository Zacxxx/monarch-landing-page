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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-primary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
             <p className="absolute bottom-4 left-4 text-xs text-muted-foreground group-hover:text-accent transition-colors">Monarch Innovations / Project Alpha Preview</p>
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