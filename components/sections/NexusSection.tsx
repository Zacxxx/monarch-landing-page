
import React from 'react';
import Section from '../Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

interface NexusSectionProps {
  id:string;
}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  animationRef: (node: HTMLElement | null) => void;
  className?: string; // Added className for potential custom styling per card if needed
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, animationRef, className = '' }) => (
  <div 
    ref={animationRef} 
    className={`bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-border hover:shadow-primary/20 transition-shadow duration-300 h-full flex flex-col ${className}`}
  >
    <div className="flex items-center mb-3">
      <div className="mr-4 text-primary p-2 bg-primary/10 rounded-md">{icon}</div>
      <h3 className="text-xl sm:text-2xl font-semibold text-primary">{title}</h3>
    </div>
    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed flex-grow">{description}</p>
  </div>
);

const NexusSection: React.FC<NexusSectionProps> = ({ id }) => {
  const titleRef = useScrollAnimation({ animationClass: 'scroll-animate-fade-in scroll-animate-scale-up', triggerOnce: true, threshold: 0.3 });
  const introRef = useScrollAnimation({ animationClass: 'scroll-animate-slide-up fast', delay: 100, triggerOnce: true });
  
  // Animation refs for individual cards can still be used if needed for staggered load-in
  // or can be applied to their container divs in the bento layout.
  const stepsData = [
    {
      ref: useScrollAnimation({ animationClass: 'scroll-animate-slide-up fast', delay: 200, triggerOnce: true }),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
      ),
      title: "Connect & Integrate",
      description: "Seamlessly connect your data sources and existing infrastructure via our robust APIs and SDKs. Our platform ensures secure and efficient data ingestion, forming the bedrock of your AI strategy."
    },
    {
      ref: useScrollAnimation({ animationClass: 'scroll-animate-slide-up fast', delay: 300, triggerOnce: true }),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
      ),
      title: "Develop & Customize",
      description: "Utilize our suite of pre-trained models and intuitive development tools, or collaborate with our experts to craft bespoke AI applications precisely tailored to your unique challenges and operational needs."
    },
    {
      ref: useScrollAnimation({ animationClass: 'scroll-animate-slide-up fast', delay: 400, triggerOnce: true }),
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      ),
      title: "Deploy & Scale",
      description: "Effortlessly deploy your AI solutions on our managed, highly scalable infrastructure. We guarantee high availability, robust security, and optimal performance as your demands grow."
    },
    {
      ref: useScrollAnimation({ animationClass: 'scroll-animate-slide-up fast', delay: 500, triggerOnce: true }),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
      ),
      title: "Monitor & Optimize",
      description: "Gain real-time insights into your AI's performance with our advanced monitoring dashboards. Leverage comprehensive MLOps tools to continuously refine and optimize your models for sustained impact."
    }
  ];

  const bentoConfig = [
    { colSpan: "md:col-span-2", rowSpan: "md:row-span-1" }, // Step 1
    { colSpan: "md:col-span-1", rowSpan: "md:row-span-1" }, // Step 2
    { colSpan: "md:col-span-1", rowSpan: "md:row-span-1" }, // Step 3
    { colSpan: "md:col-span-2", rowSpan: "md:row-span-1" }, // Step 4
  ];

  return (
    <Section id={id} contentAlignment="center" className="bg-anim-nexus">
      <div className="relative z-10 max-w-5xl w-full text-center"> {/* Increased max-w for bento */}
        <h2
          ref={titleRef}
          className="font-header font-extrabold tracking-tighter leading-none text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] text-primary nexus-pulse-glow mb-10 sm:mb-16"
        >
          NEXUS
        </h2>
        <p ref={introRef} className="text-xl sm:text-2xl text-foreground mb-12 sm:mb-16 leading-relaxed max-w-3xl mx-auto">
          Monarch Nexus is our integrated AI development and deployment platform, empowering your enterprise to harness the full potential of artificial intelligence with precision and scale.
        </p>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {stepsData.map((step, index) => (
            <div key={index} className={`${bentoConfig[index].colSpan} ${bentoConfig[index].rowSpan}`}>
              <StepCard
                animationRef={step.ref}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default NexusSection;
