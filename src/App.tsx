import { useState, useEffect } from 'react';
import { AgeProvider } from './context/AgeContext';
import { CartProvider } from './context/CartContext';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash ? window.location.hash.replace('#', '') : '/';
      setCurrentPath(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  const renderPage = () => {
    const pathOnly = currentPath.split('?')[0];

    if (pathOnly === '/' || pathOnly === '') {
      return <HomePage onNavigate={navigate} />;
    }
    if (pathOnly === '/products') {
      return <ProductsPage />;
    }
    if (pathOnly.startsWith('/product/')) {
      const productId = pathOnly.replace('/product/', '');
      return <ProductDetailPage productId={productId} onNavigate={navigate} />;
    }
    if (pathOnly === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (pathOnly === '/contact') {
      return <ContactPage />;
    }
    if (pathOnly === '/cart') {
      return <CartPage onNavigate={navigate} />;
    }
    if (pathOnly === '/checkout') {
      return <CheckoutPage onNavigate={navigate} />;
    }
    if (pathOnly === '/auth' || pathOnly === '/login') {
      return <AuthPage onNavigate={navigate} />;
    }
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <AgeProvider>
      <CartProvider>
        <MainLayout onNavigate={navigate} currentPath={currentPath}>
          {renderPage()}
        </MainLayout>
      </CartProvider>
    </AgeProvider>
  );
}

export default App;
