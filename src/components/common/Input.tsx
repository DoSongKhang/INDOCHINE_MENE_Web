import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 500, letterSpacing: '0.3px' }}>
          {label}
        </label>
      )}
      <input
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: '#171315',
          border: error ? '1px solid #e74c3c' : '1px solid #332b2e',
          borderRadius: '8px',
          color: '#f5f3f0',
          fontSize: '0.95rem',
          outline: 'none',
          transition: 'all 0.25s ease',
        }}
        className={`khoi-nien-input ${className}`}
        {...props}
      />
      {error && <span style={{ fontSize: '0.75rem', color: '#e74c3c' }}>{error}</span>}
    </div>
  );
};
