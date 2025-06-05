import React from 'react';
import Section from '../Section';

interface NexusSectionProps {
  id: string;
}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHighlighted?: boolean;
  className?: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, isHighlighted = false, className = '' }) => (
  <div className={`
    relative overflow-hidden bg-card rounded-2xl border border-border p-8 
    shadow-sm hover:shadow-xl transition-all duration-500 ease-out
    transform hover:-translate-y-2 group hover:border-primary/40
    ${isHighlighted ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-transparent' : ''}
    ${className}
  `}>
    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Animated border effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"></div>
    
    <div className="relative z-10">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground/80 transition-colors duration-300">
        {description}
      </p>
      
      {/* Subtle corner accent */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
    </div>
  </div>
);

const NexusSection: React.FC<NexusSectionProps> = ({ id }) => {
  const stepsData = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
        </svg>
      ),
      title: "Connect & Integrate",
      description: "Seamlessly connect your data sources and existing infrastructure via our robust APIs and SDKs. Our platform ensures secure and efficient data ingestion, forming the bedrock of your AI strategy.",
      isHighlighted: true
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      ),
      title: "Develop & Customize",
      description: "Utilize our suite of pre-trained models and intuitive development tools, or collaborate with our experts to craft bespoke AI applications."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: "Deploy & Scale",
      description: "Effortlessly deploy your AI solutions on our managed, highly scalable infrastructure with guaranteed high availability and robust security."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
      title: "Monitor & Optimize",
      description: "Gain real-time insights into your AI's performance with advanced monitoring dashboards and comprehensive MLOps tools for sustained impact.",
      isHighlighted: true
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
      title: "Enterprise Security",
      description: "Bank-grade security protocols with end-to-end encryption, compliance frameworks, and audit trails for complete peace of mind."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
      ),
      title: "24/7 Support",
      description: "Round-the-clock expert support with dedicated success managers and comprehensive documentation to ensure your success."
    }
  ];

  return (
    <Section id={id} contentAlignment="center" className="bg-anim-nexus">
      <div className="relative z-10 max-w-7xl w-full text-center">
        <h2 className="font-header font-extrabold tracking-tighter leading-none text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] text-primary nexus-pulse-glow mb-10 sm:mb-16">
          NEXUS
        </h2>
        <p className="text-xl sm:text-2xl text-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
          Monarch Nexus is our integrated AI development and deployment platform, empowering your enterprise to harness the full potential of artificial intelligence with precision and scale.
        </p>
        
        {/* CTA Button */}
        <div className="mb-12 sm:mb-16">
          <a
            href="https://social-post-genie-628035322183.us-west1.run.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Try Our AI Demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M7 7h10v10"></path>
              <path d="M7 17L17 7"></path>
            </svg>
          </a>
        </div>
        
        {/* Advanced Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 auto-rows-fr">
          {/* Hero Card - Full Width on Large, Spans 2 columns on Medium */}
          <div className="md:col-span-4 lg:col-span-6">
            <StepCard
              icon={stepsData[0].icon}
              title={stepsData[0].title}
              description={stepsData[0].description}
              isHighlighted={stepsData[0].isHighlighted}
            />
          </div>
          
          {/* Secondary Cards - Two Columns */}
          <div className="md:col-span-2 lg:col-span-3">
            <StepCard
              icon={stepsData[1].icon}
              title={stepsData[1].title}
              description={stepsData[1].description}
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            <StepCard
              icon={stepsData[2].icon}
              title={stepsData[2].title}
              description={stepsData[2].description}
            />
          </div>
          
          {/* Featured Card - Large Width */}
          <div className="md:col-span-4 lg:col-span-4">
            <StepCard
              icon={stepsData[3].icon}
              title={stepsData[3].title}
              description={stepsData[3].description}
              isHighlighted={stepsData[3].isHighlighted}
            />
          </div>
          
          {/* Support Cards - Compact */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <StepCard
                icon={stepsData[4].icon}
                title={stepsData[4].title}
                description={stepsData[4].description}
                className="min-h-[280px]"
              />
              <StepCard
                icon={stepsData[5].icon}
                title={stepsData[5].title}
                description={stepsData[5].description}
                className="min-h-[280px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NexusSection;
