import React from 'react';

interface SectionProps {
  id: string;
  className?: string;
  contentAlignment?: 'center' | 'left' | 'right';
  children: React.ReactNode; // Children are now mandatory
}

const Section: React.FC<SectionProps> = ({
  id,
  className = '',
  contentAlignment = 'center',
  children,
}) => {
  const alignmentClasses = {
    center: 'items-center text-center',
    left: 'items-start text-left',
    right: 'items-end text-right',
  };

  return (
    <section
      id={id}
      className={`min-h-screen w-full flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-24 relative overflow-hidden ${alignmentClasses[contentAlignment]} ${className}`}
    >
      {/* Wrapper to ensure content is above pseudo-element backgrounds */}
      <div className="relative z-10 w-full flex flex-col justify-center" style={{ alignItems: contentAlignment === 'center' ? 'center' : contentAlignment === 'left' ? 'flex-start' : 'flex-end' }}>
        {children}
      </div>
    </section>
  );
};

export default Section;