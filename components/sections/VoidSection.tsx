import React from 'react';
import Section from '../Section';

interface VoidSectionProps {
  id: string;
}

const VoidSection: React.FC<VoidSectionProps> = ({ id }) => {
  return (
    <Section id={id} contentAlignment="left" className="bg-anim-void">
      <div className="max-w-3xl w-full">
        <h2
          className="font-header text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground font-extrabold tracking-tighter leading-none mb-10 sm:mb-16 void-text-effect"
        >
          The <span className="text-accent">Monarch</span> Method
        </h2>
        
        <p className="text-lg sm:text-xl text-foreground mb-8 leading-relaxed">
          At Monarch, we transcend traditional consulting. Our bespoke AI strategies are engineered to catalyze transformation, unlocking unprecedented value and competitive advantage for your enterprise. We guide you through every stage of your AI evolution.
        </p>

        <div className="space-y-6 text-muted-foreground">
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-2">1. Discovery &amp; Strategic Alignment</h3>
            <p>We begin by deeply understanding your vision, challenges, and operational landscape. Through collaborative workshops and data analysis, we identify high-impact AI opportunities and align them with your strategic objectives, crafting a clear roadmap for success.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-2">2. Bespoke Solution Design</h3>
            <p>Leveraging cutting-edge research and our proprietary frameworks, we design tailored AI solutions. This includes model selection, architecture design, data pipeline construction, and defining key performance indicators to ensure measurable outcomes.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-2">3. Agile Implementation &amp; Integration</h3>
            <p>Our expert teams develop and deploy AI solutions with agility and precision. We focus on seamless integration with your existing systems and workflows, ensuring minimal disruption and rapid value realization, supported by rigorous testing and validation.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-2">4. Continuous Optimization &amp; Evolution</h3>
            <p>AI is a journey, not a destination. We provide ongoing monitoring, performance tuning, and model retraining to ensure your AI solutions adapt to changing dynamics and consistently deliver peak performance, fostering a culture of continuous innovation.</p>
          </div>
        </div>
        <p className="text-lg sm:text-xl text-foreground mt-10 leading-relaxed">
            Partner with <span className="text-accent font-medium">Monarch</span> to transform your potential into reality. Let's build the future, together.
        </p>
      </div>
    </Section>
  );
};

export default VoidSection;
