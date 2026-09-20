import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#171315',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '16px',
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
          padding: '28px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '18px',
              right: '20px',
              color: '#a39c97',
              fontSize: '1.4rem',
              lineHeight: 1,
              padding: '4px 8px',
              borderRadius: '50%',
            }}
          >
            ✕
          </button>
        )}
        {title && (
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              color: '#d4af37',
              fontSize: '1.5rem',
              marginBottom: '20px',
              borderBottom: '1px solid #332b2e',
              paddingBottom: '12px',
            }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};
