
import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-neutral-800 border border-neutral-700 text-red-400 px-4 py-3 rounded-lg relative my-4" role="alert">
      <strong className="font-bold">Erreur : </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorAlert;
