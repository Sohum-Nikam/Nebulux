import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`bg-black/30 backdrop-blur-md border border-white/10 rounded-xl ${className}`}>
      {children}
    </div>
  );
};