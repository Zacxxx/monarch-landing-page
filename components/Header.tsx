import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50"> {/* Added shadow and border for better separation on light bg */}
      <nav className="container mx-auto flex justify-between items-center">
        <a href="#hero" className="text-2xl sm:text-3xl font-bold tracking-tight text-primary hover:text-primary-foreground transition-colors font-header"> {/* text-foreground -> text-primary, hover:text-primary -> hover:text-primary-foreground (or a darker primary shade) */}
          MONARCH
        </a>
        <div className="space-x-4 sm:space-x-6">
          <a href="#contact" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors"> {/* Changed from text-muted-foreground */}
            Contact
          </a>
          {/* Add more navigation items here if needed */}
        </div>
      </nav>
    </header>
  );
};

export default Header;