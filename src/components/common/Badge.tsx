import React from 'react';

interface BadgeProps {
  type: 'new' | 'hot' | 'limited' | 'gold';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ type, children }) => {
  const getStyles = (): React.CSSProperties => {
    switch (type) {
      case 'new':
        return {
          background: 'linear-gradient(135deg, #3498db, #2980b9)',
          color: '#ffffff',
        };
      case 'hot':
        return {
          background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
          color: '#ffffff',
        };
      case 'limited':
        return {
          background: 'linear-gradient(135deg, #722f37, #4a151b)',
          color: '#f5e6ab',
          border: '1px solid rgba(212, 175, 55, 0.4)',
        };
      case 'gold':
        return {
          background: 'linear-gradient(135deg, #f5e6ab, #d4af37)',
          color: '#0d0b0c',
        };
    }
  };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        ...getStyles(),
      }}
    >
      {children}
    </span>
  );
};
