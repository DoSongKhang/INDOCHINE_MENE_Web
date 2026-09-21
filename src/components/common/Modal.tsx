import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  maxWidth?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, maxWidth = '650px', children }) => {
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
          maxWidth: maxWidth,
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
            aria-label="Đóng"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 60,
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(23, 19, 21, 0.95)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              color: '#f5e6ab',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            }}
            className="hover:scale-110 hover:border-gold hover:text-white"
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
