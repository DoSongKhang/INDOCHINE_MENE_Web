import React, { useState } from 'react';
import type { CartItem } from '../../types/cart';
import { formatCurrency } from '../../utils/formatCurrency';

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, subtotal }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState('');

  const shippingFee = subtotal > 2000000 ? 0 : 50000;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'KHOINIEN2026') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setPromoSuccess('Áp dụng mã KHOINIEN2026 thành công! Giảm 10%');
    } else if (promoCode.trim().toUpperCase() === 'TETVIP') {
      setDiscountAmount(200000);
      setPromoSuccess('Áp dụng mã TETVIP thành công! Giảm 200.000đ');
    } else {
      alert('Mã giảm giá không hợp lệ. Gợi ý thử mã: KHOINIEN2026 hoặc TETVIP');
    }
  };

  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  return (
    <div
      style={{
        backgroundColor: '#171315',
        border: '1px solid #332b2e',
        borderRadius: '16px',
        padding: '24px',
        position: 'sticky',
        top: '100px',
      }}
    >
      <h3 style={{ fontSize: '1.2rem', color: '#d4af37', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>🛍️</span> ĐƠN HÀNG CỦA BẠN ({cart.reduce((s, i) => s + i.quantity, 0)})
      </h3>

      {/* Cart Items List */}
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
        {cart.map((item) => (
          <div
            key={item.product.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '10px 0',
              borderBottom: '1px solid #2e2629',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <div>
                <div style={{ color: '#f5e6ab', fontWeight: 600, fontSize: '0.85rem' }}>{item.product.name}</div>
                <div style={{ color: '#6e6b68' }}>Số lượng: {item.quantity}</div>
              </div>
            </div>
            <div style={{ color: '#fbb450', fontWeight: 'bold' }}>
              {formatCurrency(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Box */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Mã ưu đãi (VD: KHOINIEN2026)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: '#0d0b0c',
              border: '1px solid #332b2e',
              borderRadius: '6px',
              padding: '8px 12px',
              color: '#f5f3f0',
              fontSize: '0.85rem',
              outline: 'none',
              textTransform: 'uppercase',
            }}
          />
          <button
            type="button"
            onClick={handleApplyPromo}
            style={{
              backgroundColor: '#4a151b',
              color: '#f5e6ab',
              border: '1px solid #d4af37',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
          >
            ÁP DỤNG
          </button>
        </div>
        {promoSuccess && (
          <p style={{ color: '#2ecc71', fontSize: '0.75rem', marginTop: '6px' }}>✓ {promoSuccess}</p>
        )}
      </div>

      {/* Financial Summary Calculation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', borderTop: '1px solid #2e2629', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a39c97' }}>
          <span>Tạm tính:</span>
          <span style={{ color: '#f5f3f0' }}>{formatCurrency(subtotal)}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a39c97' }}>
          <span>Phí vận chuyển bảo quản hỏa tốc:</span>
          <span>{shippingFee === 0 ? <strong style={{ color: '#2ecc71' }}>Miễn phí (Đơn &gt;2 triệu)</strong> : formatCurrency(shippingFee)}</span>
        </div>

        {discountAmount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2ecc71' }}>
            <span>Ưu đãi giảm giá VIP:</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: '1px solid #332b2e',
            paddingTop: '16px',
            marginTop: '8px',
          }}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f5f3f0' }}>TỔNG CỘNG:</span>
          <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fbb450' }}>
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};
