import React from 'react';

interface PreloaderProps {
  show: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
    </div>
  );
};