import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { ROUTES } from '../../constants/routes';

interface HeaderProps {
  onSearchClick?: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPath = '/' }) => {
  const { totalItems, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'TRANG CHỦ', path: ROUTES.HOME },
    { label: 'VỀ CHÚNG TÔi', path: ROUTES.ABOUT },
    { label: 'GIFT SET', path: `${ROUTES.PRODUCTS}?cat=giftset` },
    { label: 'PROSECCO & BỘ SƯU TẬP', path: ROUTES.PRODUCTS },
    { label: 'LIÊN HỆ', path: ROUTES.CONTACT },
  ];

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Top Banner Bar */}


      {/* Main Glass Header */}
      <div
        style={{
          backgroundColor: 'rgba(8, 8, 8, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #222222',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo Brand */}
          <div
            onClick={() => handleNav(ROUTES.HOME)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px' }}>
                IM
              </span>
            </div>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.7rem',
                  lineHeight: 1,
                  color: '#ffffff',
                  letterSpacing: '3px',
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                INDOCHINE MÈNE
              </h1>
              <span style={{ fontSize: '0.62rem', color: '#999999', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px', display: 'block' }}>
                PROSECCO &amp; FINE WINES
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <span
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  style={{
                    color: isActive ? '#ffffff' : '#a3a3a3',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '1.5px',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'all 0.25s ease',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                      }}
                    />
                  )}
                </span>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Cart Icon */}
            <button
              onClick={openCart}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              <span>🛒 Giỏ Hàng</span>
              <span
                style={{
                  backgroundColor: '#ffffff',
                  color: '#050505',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}
              >
                {totalItems}
              </span>
            </button>

            {/* Mobile Hamburger Menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                color: '#ffffff',
                fontSize: '1.6rem',
                padding: '4px',
              }}
              className="show-mobile-btn"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            style={{
              paddingTop: '16px',
              paddingBottom: '16px',
              borderTop: '1px solid #222222',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {navItems.map((item) => (
              <span
                key={item.path}
                onClick={() => handleNav(item.path)}
                style={{
                  color: currentPath === item.path ? '#ffffff' : '#a3a3a3',
                  fontSize: '0.95rem',
                  fontWeight: currentPath === item.path ? 600 : 400,
                  letterSpacing: '1.5px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: currentPath === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .show-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
};
