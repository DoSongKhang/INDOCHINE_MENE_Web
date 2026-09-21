import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/cart/CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/common/Button';
import { FaShoppingCart } from 'react-icons/fa';

interface CartPageProps {
  onNavigate?: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, totalPrice, totalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '75vh', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#121212', padding: '40px', borderRadius: '16px', border: '1px solid #222222' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px', display: "flex", justifyContent: "center", alignItems: "center" }}><FaShoppingCart /></div>
          <h2 style={{ color: '#ffffff', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Giỏ Hàng Của Bạn Đang Trống</h2>
          <p style={{ color: '#999999', marginBottom: '24px' }}>
            Khám phá ngay bộ sưu tập Prosecco &amp; Rượu Vang Indochine Mène tuyệt hảo nhất.
          </p>
          <Button variant="gold" size="md" onClick={() => onNavigate && onNavigate('/products')}>
            XEM SẢN PHẨM INDOCHINE MÈNE
          </Button>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
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
    <div style={{ backgroundColor: '#050505', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '32px', fontFamily: 'var(--font-serif)' }}>
          GIỎ HÀNG INDOCHINE MÈNE ({totalItems} sản phẩm)
        </h1>

        <div style={{ backgroundColor: '#171315', border: '1px solid #332b2e', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px' }}>
            <button onClick={clearCart} style={{ color: '#e74c3c', fontSize: '0.85rem', textDecoration: 'underline' }}>
              Xóa tất cả sản phẩm
            </button>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fbb450' }}>
              Tổng tiền: {formatCurrency(totalPrice)}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <Button variant="outline" size="lg" onClick={() => onNavigate && onNavigate('/products')}>
            ← TIẾP TỤC MUA SẮM
          </Button>
          <Button variant="gold" size="lg" onClick={handleCheckout}>
            TIẾN HÀNH THANH TOÁN →
          </Button>
        </div>
      </div>
    </div>
  );
};
