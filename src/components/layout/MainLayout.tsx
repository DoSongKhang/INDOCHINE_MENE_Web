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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0d0b0c' }}>
      <AgeVerificationModal />
      <Header onNavigate={onNavigate} currentPath={currentPath} />
      <main style={{ flex: 1 }}>{children}</main>
      <CartDrawer onCheckoutClick={() => onNavigate && onNavigate('/checkout')} />
      <Footer />
    </div>
  );
};
