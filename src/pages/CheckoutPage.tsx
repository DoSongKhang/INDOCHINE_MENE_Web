import React, { useState } from 'react';
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

  const handleFormChange = (field: keyof CheckoutFormData, value: any) => {
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
      <div style={{ backgroundColor: '#0d0b0c', minHeight: '80vh', padding: '80px 24px' }}>
        <div
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
          <p style={{ color: '#d4af37', fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px' }}>
            Mã Đơn Hàng VIP: #{completedOrder.orderId}
          </p>

          <p style={{ color: '#a39c97', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px' }}>
            Cảm ơn quý khách <strong>{completedOrder.formData.fullName}</strong> đã lựa chọn thương hiệu rượu vang cao cấp <strong>Khởi Niên</strong>. Chuyên viên dịch vụ VIP sẽ liên hệ qua SĐT <strong>{completedOrder.formData.phone}</strong> trong vòng 15 phút để xác nhận giao hàng hỏa tốc.
          </p>

          {/* QR Code Bank Transfer Display if Bank Transfer selected */}
          {completedOrder.formData.paymentMethod === 'bank_transfer' && (
            <div
              style={{
                backgroundColor: '#0d0b0c',
                border: '1px dashed #d4af37',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              <h4 style={{ color: '#f5e6ab', marginBottom: '12px' }}>
                🏛️ THÔNG TIN CHUYỂN KHOẢN NGÂN HÀNG VIETQR
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#a39c97', marginBottom: '16px' }}>
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
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=KHOINIEN-WINE-ORDER"
                  alt="VietQR Khoi Nien"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#f5f3f0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>Ngân hàng: <strong>MB BANK (Ngân Hàng Quân Đội)</strong></div>
                <div>Số tài khoản: <strong style={{ color: '#fbb450' }}>8888 9999 6868</strong></div>
                <div>Chủ tài khoản: <strong>CTY CP RUOU VANG KHOI NIEN</strong></div>
                <div>Nội dung chuyển khoản: <strong style={{ color: '#d4af37' }}>{completedOrder.orderId} - {completedOrder.formData.phone}</strong></div>
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid #332b2e', paddingTop: '24px', marginBottom: '32px', textAlign: 'left', fontSize: '0.9rem' }}>
            <h4 style={{ color: '#d4af37', marginBottom: '12px' }}>CHI TIẾT ĐƠN HÀNG</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#a39c97' }}>
              <div>Địa chỉ nhận: <strong>{completedOrder.formData.address}, {completedOrder.formData.city}</strong></div>
              <div>Tổng tiền thanh toán: <strong style={{ color: '#fbb450', fontSize: '1.1rem' }}>{formatCurrency(completedOrder.total)}</strong></div>
              <div>Hình thức thanh toán: <strong>{completedOrder.formData.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : completedOrder.formData.paymentMethod === 'bank_transfer' ? 'Chuyển khoản Ngân hàng VietQR' : 'Cổng VNPay'}</strong></div>
            </div>
          </div>

          <Button variant="gold" size="lg" onClick={() => onNavigate && onNavigate('/')}>
            QUAY LẠI TRANG CHỦ KHỞI NIÊN
          </Button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: '#0d0b0c', minHeight: '75vh', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#171315', padding: '40px', borderRadius: '16px', border: '1px solid #332b2e' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛍️</div>
          <h2 style={{ color: '#f5e6ab', marginBottom: '12px' }}>Giỏ Hàng Của Bạn Đang Trống</h2>
          <p style={{ color: '#a39c97', marginBottom: '24px' }}>
            Vui lòng chọn sản phẩm Prosecco hoặc Hộp Quà Tết Khởi Niên trước khi tiến hành thanh toán.
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
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#f5e6ab', marginBottom: '36px', textAlign: 'center' }}>
          THANH TOÁN ĐƠN HÀNG KHỞI NIÊN VIP
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
          {/* Left Form */}
          <div style={{ flex: '1 1 500px' }}>
            <CheckoutForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={handleSubmitOrder}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Summary */}
          <div style={{ flex: '1 1 350px' }}>
            <OrderSummary cart={cart} subtotal={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
};
