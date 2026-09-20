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
          background: 'linear-gradient(135deg, #f5e6ab 0%, #d4af37 50%, #b89628 100%)',
          color: '#0d0b0c',
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)',
          border: 'none',
        };
      case 'wine':
        return {
          background: 'linear-gradient(135deg, #94424d 0%, #722f37 50%, #4a151b 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(114, 47, 55, 0.3)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: '#d4af37',
          border: '1px solid #d4af37',
          boxShadow: 'none',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#f5f3f0',
          border: 'none',
          boxShadow: 'none',
        };
    }
  };

  return (
    <button
      style={{ ...baseStyles, ...getVariantStyles() }}
      className={`khoi-nien-btn ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
