import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { ROUTES } from '../../constants/routes';
import anh2 from "../../assets/images/wines/anh2.png"
import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

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
    { label: 'VỀ CHÚNG TÔI', path: ROUTES.ABOUT },
    { label: 'GIFT SET', path: `${ROUTES.PRODUCTS}?cat=giftset` },
    { label: 'SẢN PHẨM', path: ROUTES.PRODUCTS },
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
      {/* Main Glass Header */}
      <div
        className="main-header-bar"
        style={{
          backgroundColor: 'rgba(8, 8, 8, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #222222',
          padding: '8px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Logo Brand */}
          <div
            className="header-logo-container"
            onClick={() => handleNav(ROUTES.HOME)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
          >
            <div
              className="header-logo-badge"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(8, 8, 8, 0.95)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src={anh2}
                alt="logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div>
              <h1
                className="header-logo-title"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  lineHeight: 1.1,
                  color: '#ffffff',
                  letterSpacing: '1.8px',
                  margin: 0,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                INDOCHINE MÈNE
              </h1>
              <span className="header-logo-sub" style={{ fontSize: '0.52rem', color: '#999999', letterSpacing: '1.4px', textTransform: 'uppercase', marginTop: '2px', display: 'block', whiteSpace: 'nowrap' }}>
                PROSECCO &amp; FINE WINES
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hide-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(14px, 1.8vw, 26px)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <span
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  style={{
                    color: isActive ? '#ffffff' : '#a3a3a3',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '6px 0',
                    transition: 'all 0.25s ease',
                    fontFamily: 'var(--font-sans)',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
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
          <div className="header-actions-container" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* Cart Icon */}
            <button
              className="header-btn-cart"
              onClick={openCart}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 15px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <span className="text-[1.1rem] flex items-center text-white">
                <FaShoppingCart />
              </span>
              <span className="header-btn-label">Giỏ Hàng</span>
              <span
                style={{
                  backgroundColor: '#770000',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                }}
              >
                {totalItems}
              </span>
            </button>

            {/* Auth / Account Button */}
            <button
              className="header-btn-auth"
              onClick={() => handleNav(ROUTES.AUTH)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 13px',
                borderRadius: '20px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                color: '#d4af37',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <span className="text-[0.9rem] flex items-center text-white">
                <FaUser />
              </span>
              <span className="header-btn-label">Tài Khoản</span>
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
            <span
              onClick={() => handleNav(ROUTES.AUTH)}
              style={{
                color: currentPath === ROUTES.AUTH ? '#ffffff' : '#d4af37',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '1.5px',
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: currentPath === ROUTES.AUTH ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
                cursor: 'pointer',
                borderTop: '1px solid #222222',
                paddingTop: '12px',
              }}
            >
              👤 TÀI KHOẢN / ĐĂNG NHẬP
            </span>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .hide-mobile { display: none !important; }
          .show-mobile-btn { display: block !important; }
        }

        @media (max-width: 768px) {
          .main-header-bar {
            padding: 8px 12px !important;
          }

          .header-logo-container {
            gap: 8px !important;
            min-width: 0 !important;
            flex-shrink: 1 !important;
          }

          .header-logo-badge {
            width: 36px !important;
            height: 36px !important;
          }

          .header-logo-title {
            font-size: 0.95rem !important;
            letter-spacing: 1px !important;
          }

          .header-logo-sub {
            display: none !important;
          }

          .header-actions-container {
            gap: 8px !important;
            flex-shrink: 0 !important;
          }

          .header-btn-label {
            display: none !important;
          }

          .header-btn-cart {
            padding: 6px 10px !important;
            gap: 4px !important;
          }

          .header-btn-auth {
            padding: 6px 10px !important;
          }
        }
      `}</style>
    </header>
  );
};
