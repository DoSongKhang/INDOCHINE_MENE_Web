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
    { label: 'GIFT SET TẾT', path: `${ROUTES.PRODUCTS}?cat=giftset` },
    { label: 'PROSECCO & BỘ SƯU TẬP', path: ROUTES.PRODUCTS },
    { label: 'DI SẢN KHỞI NIÊN', path: ROUTES.ABOUT },
    { label: 'LIÊN HỆ SHOWROOM', path: ROUTES.CONTACT },
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
      <div
        style={{
          backgroundColor: '#4a151b',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          color: '#f5e6ab',
          fontSize: '0.8rem',
          padding: '6px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          letterSpacing: '0.5px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>📍 Showroom Trưng Bày: Hà Nội | TP. Hồ Chí Minh | Đà Nẵng</span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span>🍷 Khám phá Hộp Quà Tết Khởi Niên Limited Edition 2026</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="tel:1900888999" style={{ color: '#d4af37', fontWeight: 600 }}>
            📞 Hotline VIP: 1900 888 999
          </a>
        </div>
      </div>

      {/* Main Glass Header */}
      <div
        style={{
          backgroundColor: 'rgba(13, 11, 12, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #2e2629',
          padding: '12px 24px',
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
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid #d4af37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(114, 47, 55, 0.3))',
              }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>
                KN
              </span>
            </div>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  lineHeight: 1,
                  color: '#f5e6ab',
                  letterSpacing: '2px',
                  margin: 0,
                }}
              >
                KHỞI NIÊN
              </h1>
              <span style={{ fontSize: '0.65rem', color: '#d4af37', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                PROSECCO & LUXURY WINE
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
                    color: isActive ? '#d4af37' : '#f5f3f0',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'all 0.25s ease',
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
                        backgroundColor: '#d4af37',
                        boxShadow: '0 0 8px #d4af37',
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
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                color: '#d4af37',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <span>🛒 Giỏ Hàng</span>
              <span
                style={{
                  backgroundColor: '#722f37',
                  color: '#ffffff',
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

            {/* Auth / Account Button */}
            <button
              onClick={() => handleNav(ROUTES.AUTH)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '20px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                color: '#d4af37',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>👤 Tài Khoản</span>
            </button>

            {/* Mobile Hamburger Menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                color: '#d4af37',
                fontSize: '1.6rem',
                padding: '4px',
              }}
              className="show-mobile-btn"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            style={{
              paddingTop: '16px',
              paddingBottom: '8px',
              borderTop: '1px solid #332b2e',
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
                  color: currentPath === item.path ? '#d4af37' : '#f5f3f0',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: currentPath === item.path ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
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
