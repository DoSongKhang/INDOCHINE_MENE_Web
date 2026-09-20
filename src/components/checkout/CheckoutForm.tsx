import React from 'react';
import type { CheckoutFormData, PaymentMethod } from '../../types/order';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Contact Info Box */}
      <div
        style={{
          backgroundColor: '#171315',
          border: '1px solid #332b2e',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', color: '#d4af37', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>👤</span> THÔNG TIN GIAO HÀNG VIP
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <Input
            label="Họ và Tên người nhận *"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            required
          />
          <Input
            label="Số Điện Thoại liên hệ *"
            placeholder="Ví dụ: 0988 123 456"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '16px' }}>
          <Input
            label="Địa chỉ Email (Nhận hóa đơn điện tử) *"
            type="email"
            placeholder="Ví dụ: email@example.com"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <Input
            label="Tỉnh / Thành phố *"
            placeholder="Ví dụ: TP. Hồ Chí Minh"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            required
          />
          <Input
            label="Địa chỉ chi tiết (Số nhà, tên đường, quận/huyện) *"
            placeholder="Ví dụ: 168 Nguyễn Huệ, P. Bến Nghé, Q. 1"
            value={formData.address}
            onChange={(e) => onChange('address', e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '16px' }}>
          <Input
            label="Ghi chú đơn hàng / Lời nhắn quà tặng (Tùy chọn)"
            placeholder="Ví dụ: In khắc logo doanh nghiệp, viết thiệp chúc mừng Tết..."
            value={formData.note || ''}
            onChange={(e) => onChange('note', e.target.value)}
          />
        </div>
      </div>

      {/* Payment Method Selector */}
      <div
        style={{
          backgroundColor: '#171315',
          border: '1px solid #332b2e',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', color: '#d4af37', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>💳</span> PHƯƠNG THỨC THANH TOÁN
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* COD Option */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px',
              borderRadius: '10px',
              backgroundColor: formData.paymentMethod === 'cod' ? 'rgba(212, 175, 55, 0.1)' : '#0d0b0c',
              border: formData.paymentMethod === 'cod' ? '1px solid #d4af37' : '1px solid #332b2e',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'cod'}
              onChange={() => onChange('paymentMethod', 'cod' as PaymentMethod)}
            />
            <div>
              <div style={{ color: '#f5f3f0', fontWeight: 600 }}>💵 Thanh toán khi nhận hàng (COD)</div>
              <div style={{ fontSize: '0.8rem', color: '#a39c97' }}>Kiểm tra hàng & đóng gói cẩn thận trước khi thanh toán.</div>
            </div>
          </label>

          {/* Bank Transfer QR Option */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px',
              borderRadius: '10px',
              backgroundColor: formData.paymentMethod === 'bank_transfer' ? 'rgba(212, 175, 55, 0.1)' : '#0d0b0c',
              border: formData.paymentMethod === 'bank_transfer' ? '1px solid #d4af37' : '1px solid #332b2e',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'bank_transfer'}
              onChange={() => onChange('paymentMethod', 'bank_transfer' as PaymentMethod)}
            />
            <div>
              <div style={{ color: '#f5f3f0', fontWeight: 600 }}>🏛️ Chuyển khoản Ngân Hàng (Quét mã VietQR Nhanh)</div>
              <div style={{ fontSize: '0.8rem', color: '#a39c97' }}>Giảm ngay 2% trên tổng đơn hàng cho đơn chuyển khoản trước.</div>
            </div>
          </label>

          {/* VNPay Option */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px',
              borderRadius: '10px',
              backgroundColor: formData.paymentMethod === 'vnpay' ? 'rgba(212, 175, 55, 0.1)' : '#0d0b0c',
              border: formData.paymentMethod === 'vnpay' ? '1px solid #d4af37' : '1px solid #332b2e',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'vnpay'}
              onChange={() => onChange('paymentMethod', 'vnpay' as PaymentMethod)}
            />
            <div>
              <div style={{ color: '#f5f3f0', fontWeight: 600 }}>💳 Cổng Thanh Toán VNPay / Thẻ Thẻ ATM / Visa / Mastercard</div>
              <div style={{ fontSize: '0.8rem', color: '#a39c97' }}>Thanh toán bảo mật tức thì qua ứng dụng ngân hàng.</div>
            </div>
          </label>
        </div>
      </div>

      {/* Age Check Box */}
      <div style={{ padding: '0 8px' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', color: '#a39c97' }}>
          <input
            type="checkbox"
            checked={formData.isAgeConfirmed}
            onChange={(e) => onChange('isAgeConfirmed', e.target.checked)}
            required
            style={{ marginTop: '3px' }}
          />
          <span>
            Tôi xác nhận tôi từ <strong>18 tuổi trở lên</strong> và đồng ý với điều khoản thưởng thức có trách nhiệm của Indochine Mène Việt Nam.
          </span>
        </label>
      </div>

      <Button variant="gold" size="lg" fullWidth type="submit" disabled={isSubmitting || !formData.isAgeConfirmed}>
        {isSubmitting ? 'ĐANG XỬ LÝ ĐƠN HÀNG...' : 'XÁC NHẬN ĐẶT HÀNG INDOCHINE MÈNE'}
      </Button>
    </form>
  );
};
