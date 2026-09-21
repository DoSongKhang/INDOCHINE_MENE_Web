import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'wine' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}


export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: '8px',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontSize: size === 'sm' ? '0.8rem' : size === 'lg' ? '1rem' : '0.9rem',
    padding: size === 'sm' ? '8px 16px' : size === 'lg' ? '14px 32px' : '10px 22px',
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'gold':
        return {
          background: '#ffffff',
          color: '#050505',
          boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)',
          border: '1px solid #ffffff',
          fontWeight: 700,
        };
      case 'wine':
        return {
          background: '#1a1a1a',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: '#ffffff',
          border: '1px solid #ffffff',
          boxShadow: 'none',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#e5e5e5',
          border: 'none',
          boxShadow: 'none',
        };
    }
  };

  return (
    <button
      style={{ ...baseStyles, ...getVariantStyles() }}
      className={`indochine-btn ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
