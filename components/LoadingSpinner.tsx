
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-10" role="status" aria-label="Chargement en cours">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-neutral-300"></div>
    </div>
  );
};

export default LoadingSpinner;
