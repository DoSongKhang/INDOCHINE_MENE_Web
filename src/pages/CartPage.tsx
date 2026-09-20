import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/cart/CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/common/Button';

interface CartPageProps {
  onNavigate?: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, totalPrice, totalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: '#0d0b0c', minHeight: '75vh', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#171315', padding: '40px', borderRadius: '16px', border: '1px solid #332b2e' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛒</div>
          <h2 style={{ color: '#f5e6ab', marginBottom: '12px' }}>Giỏ Hàng Của Bạn Đang Trống</h2>
          <p style={{ color: '#a39c97', marginBottom: '24px' }}>
            Khám phá ngay bộ sưu tập Prosecco & Rượu Vang Khởi Niên tuyệt hảo nhất.
          </p>
          <Button variant="gold" size="md" onClick={() => onNavigate && onNavigate('/products')}>
            XEM SẢN PHẨM KHỞI NIÊN
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0d0b0c', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#f5e6ab', marginBottom: '32px' }}>
          GIỎ HÀNG KHỞI NIÊN ({totalItems} sản phẩm)
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
          <Button variant="gold" size="lg" onClick={() => onNavigate && onNavigate('/checkout')}>
            TIẾN HÀNH THANH TOÁN →
          </Button>
        </div>
      </div>
    </div>
  );
};
