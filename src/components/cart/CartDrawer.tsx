import React from 'react';
import { useCart } from '../../hooks/useCart';
import { CartItem } from './CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../common/Button';

interface CartDrawerProps {
  onCheckoutClick?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckoutClick }) => {
  const { cart, isCartOpen, closeCart, totalPrice, totalItems, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={closeCart}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#171315',
          borderLeft: '1px solid #d4af37',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
          animation: 'slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #332b2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0d0b0c',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛒</span>
            <h3 style={{ fontSize: '1.2rem', color: '#f5e6ab', margin: 0 }}>
              GIỎ HÀNG KHỞI NIÊN ({totalItems})
            </h3>
          </div>
          <button onClick={closeCart} style={{ color: '#a39c97', fontSize: '1.4rem' }}>
            ✕
          </button>
        </div>

        {/* Drawer Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#a39c97' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍾</div>
              <p style={{ fontSize: '1rem', color: '#f5e6ab', marginBottom: '8px' }}>
                Giỏ hàng của bạn chưa có sản phẩm
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                Hãy lựa chọn những dòng Prosecco & Gift Set Khởi Niên tuyệt hảo nhất.
              </p>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
              <div style={{ padding: '16px 0', textAlign: 'right' }}>
                <button
                  onClick={clearCart}
                  style={{ color: '#e74c3c', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Xóa tất cả sản phẩm
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid #332b2e',
              backgroundColor: '#0d0b0c',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.8rem',
                color: '#d4af37',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🎁</span>
              <span>Miễn phí túi quà biếu Tết cao cấp Khởi Niên cho mọi đơn hàng.</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '20px',
              }}
            >
              <span style={{ fontSize: '1rem', color: '#f5f3f0' }}>Tổng Tiền Thanh Toán:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbb450' }}>
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <Button
              variant="gold"
              size="lg"
              fullWidth
              onClick={() => {
                closeCart();
                if (onCheckoutClick) onCheckoutClick();
              }}
            >
              TIẾN HÀNH THANH TOÁN
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
