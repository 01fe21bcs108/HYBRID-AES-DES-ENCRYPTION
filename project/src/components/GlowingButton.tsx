import React from 'react';

interface GlowingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'purple';
  disabled?: boolean;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  onClick,
  children,
  color = 'blue',
  disabled = false,
}) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/50',
    green: 'bg-green-500 hover:bg-green-600 shadow-green-500/50',
    purple: 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${colorClasses[color]}
        px-6 py-3 rounded-lg font-semibold text-white
        transform transition-all duration-300
        shadow-lg hover:shadow-xl
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        relative overflow-hidden
        before:absolute before:inset-0
        before:bg-white before:opacity-0 before:hover:opacity-20
        before:transition-opacity
      `}
    >
      {children}
    </button>
  );
}

export default GlowingButton;