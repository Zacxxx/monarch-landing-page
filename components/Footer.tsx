import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="p-6 sm:p-8 text-center bg-secondary border-t border-border">
      <p className="text-xs sm:text-sm text-muted-foreground">
        &copy; {currentYear} Monarch Dynamics. All rights reserved. Innovate Fearlessly.
      </p>
    </footer>
  );
};

export default Footer;