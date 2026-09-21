import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { AgeVerificationModal } from '../common/AgeVerificationModal';

interface MainLayoutProps {
  children: React.ReactNode;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavigate, currentPath }) => {
  const handleProceedToCheckout = () => {
    if (!onNavigate) return;
    const isLoggedIn = localStorage.getItem('khoi_nien_is_logged_in') === 'true';
    if (isLoggedIn) {
      onNavigate('/checkout');
    } else {
      sessionStorage.setItem('redirect_after_auth', '/checkout');
      onNavigate('/auth');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0d0b0c' }}>
      <AgeVerificationModal onNavigate={onNavigate} />
      <Header onNavigate={onNavigate} currentPath={currentPath} />
      <main style={{ flex: 1 }}>{children}</main>
      <CartDrawer onCheckoutClick={handleProceedToCheckout} />
      <Footer />
    </div>
  );
};
