import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import type { CheckoutFormData, OrderInfo } from '../types/order';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/common/Button';

interface CheckoutPageProps {
  onNavigate?: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, totalPrice, clearCart } = useCart();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('khoi_nien_is_logged_in') === 'true';
    if (!isLoggedIn && onNavigate) {
      sessionStorage.setItem('redirect_after_auth', '/checkout');
      onNavigate('/auth');
    }
  }, [onNavigate]);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    note: '',
    paymentMethod: 'bank_transfer',
    isAgeConfirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderInfo | null>(null);

  const handleFormChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isAgeConfirmed) {
      alert('Vui lòng xác nhận bạn đủ 18 tuổi để hoàn tất đặt hàng.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'KN-' + Math.floor(100000 + Math.random() * 900000);
      const shippingFee = totalPrice > 2000000 ? 0 : 50000;
      const order: OrderInfo = {
        orderId,
        items: [...cart],
        formData: { ...formData },
        subtotal: totalPrice,
        shippingFee,
        discount: 0,
        total: totalPrice + shippingFee,
        createdAt: new Date().toLocaleString('vi-VN'),
      };

      setCompletedOrder(order);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  if (completedOrder) {
    return (
      <div className="checkout-success-wrapper" style={{ backgroundColor: '#0d0b0c', minHeight: '80vh', padding: '80px 24px' }}>
        <div
          className="checkout-success-card"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            backgroundColor: '#171315',
            border: '1px solid #d4af37',
            borderRadius: '20px',
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2)',
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🥂</div>
          <h2 style={{ fontSize: '2rem', color: '#f5e6ab', marginBottom: '8px' }}>
            ĐẶT HÀNG THÀNH CÔNG!
          </h2>
          <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px' }}>
            Mã Đơn Hàng VIP: #{completedOrder.orderId}
          </p>

          <p style={{ color: '#999999', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px' }}>
            Cảm ơn quý khách <strong>{completedOrder.formData.fullName}</strong> đã lựa chọn thương hiệu rượu vang cao cấp <strong>Indochine Mène</strong>. Chuyên viên dịch vụ VIP sẽ liên hệ qua SĐT <strong>{completedOrder.formData.phone}</strong> trong vòng 15 phút để xác nhận giao hàng hỏa tốc.
          </p>

          {/* QR Code Bank Transfer Display if Bank Transfer selected */}
          {completedOrder.formData.paymentMethod === 'bank_transfer' && (
            <div
              style={{
                backgroundColor: '#050505',
                border: '1px dashed #ffffff',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              <h4 style={{ color: '#ffffff', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
                🏛️ THÔNG TIN CHUYỂN KHOẢN NGÂN HÀNG VIETQR
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#999999', marginBottom: '16px' }}>
                Vui lòng quét mã QR hoặc chuyển khoản đúng cú pháp bên dưới để được ưu tiên xử lý:
              </p>
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  margin: '0 auto 16px',
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=INDOCHINE-MENE-WINE-ORDER"
                  alt="VietQR Indochine Mene"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>Ngân hàng: <strong>MB BANK (Ngân Hàng Quân Đội)</strong></div>
                <div>Số tài khoản: <strong style={{ color: '#ffffff' }}>8888 9999 6868</strong></div>
                <div>Chủ tài khoản: <strong>CTY CP RUOU VANG INDOCHINE MENE</strong></div>
                <div>Nội dung chuyển khoản: <strong style={{ color: '#ffffff' }}>{completedOrder.orderId} - {completedOrder.formData.phone}</strong></div>
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid #222222', paddingTop: '24px', marginBottom: '32px', textAlign: 'left', fontSize: '0.9rem' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>CHI TIẾT ĐƠN HÀNG</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#999999' }}>
              <div>Địa chỉ nhận: <strong>{completedOrder.formData.address}, {completedOrder.formData.city}</strong></div>
              <div>Tổng tiền thanh toán: <strong style={{ color: '#ffffff', fontSize: '1.1rem' }}>{formatCurrency(completedOrder.total)}</strong></div>
              <div>Hình thức thanh toán: <strong>{completedOrder.formData.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : completedOrder.formData.paymentMethod === 'bank_transfer' ? 'Chuyển khoản Ngân hàng VietQR' : 'Cổng VNPay'}</strong></div>
            </div>
          </div>

          <Button variant="gold" size="lg" onClick={() => onNavigate && onNavigate('/')}>
            QUAY LẠI TRANG CHỦ INDOCHINE MÈNE
          </Button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty-wrapper" style={{ backgroundColor: '#050505', minHeight: '75vh', padding: '80px 24px', textAlign: 'center' }}>
        <div className="checkout-empty-card" style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#121212', padding: '40px', borderRadius: '16px', border: '1px solid #222222' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛍️</div>
          <h2 style={{ color: '#ffffff', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Giỏ Hàng Của Bạn Đang Trống</h2>
          <p style={{ color: '#999999', marginBottom: '24px' }}>
            Vui lòng chọn sản phẩm Prosecco hoặc Gift Set Indochine Mène trước khi tiến hành thanh toán.
          </p>
          <Button variant="gold" size="md" onClick={() => onNavigate && onNavigate('/products')}>
            XEM SẢN PHẨM INDOCHINE MÈNE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-wrapper" style={{ backgroundColor: '#050505', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1 className="checkout-main-title" style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '36px', textAlign: 'center', fontFamily: 'var(--font-serif)' }}>
          THANH TOÁN ĐƠN HÀNG INDOCHINE MÈNE VIP
        </h1>

        <div className="checkout-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
          {/* Left Form */}
          <div className="checkout-col-form" style={{ flex: '1 1 500px' }}>
            <CheckoutForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={handleSubmitOrder}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Summary */}
          <div className="checkout-col-summary" style={{ flex: '1 1 350px' }}>
            <OrderSummary cart={cart} subtotal={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
};
