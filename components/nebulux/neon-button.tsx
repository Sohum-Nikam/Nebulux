import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  onClick,
  disabled = false,
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variantClasses = variant === 'primary' 
    ? "bg-white text-black hover:bg-gray-200 focus:ring-white"
    : "bg-transparent text-white border border-white hover:bg-white/10 focus:ring-white";
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};