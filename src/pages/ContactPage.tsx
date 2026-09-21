import React, { useState } from 'react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: '#ffffff', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>
            HỆ THỐNG SHOWROOM &amp; ĐẶT HÀNG VIP
          </span>
          <h1 style={{ fontSize: '2.8rem', color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-serif)' }}>
            LIÊN HỆ THƯƠNG HIỆU INDOCHINE MÈNE
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {/* Showroom Addresses */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: '#121212',
                border: '1px solid #222222',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
                📍 SHOWROOM HÀ NỘI
              </h3>
              <p style={{ color: '#ffffff', marginBottom: '6px' }}>
                <strong>Địa chỉ:</strong> 88 Lý Thường Kiệt, Q. Hoàn Kiếm, Hà Nội
              </p>
              <p style={{ color: '#999999', fontSize: '0.85rem' }}>
                Hotline: 024 3988 9999 • Giờ mở cửa: 08:30 - 21:30
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#121212',
                border: '1px solid #222222',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
                📍 SHOWROOM TP. HỒ CHÍ MINH
              </h3>
              <p style={{ color: '#ffffff', marginBottom: '6px' }}>
                <strong>Địa chỉ:</strong> 168 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP. HCM
              </p>
              <p style={{ color: '#999999', fontSize: '0.85rem' }}>
                Hotline: 028 3822 8888 • Giờ mở cửa: 08:30 - 21:30
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#121212',
                border: '1px solid #222222',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
                📍 SHOWROOM ĐÀ NẴNG
              </h3>
              <p style={{ color: '#ffffff', marginBottom: '6px' }}>
                <strong>Địa chỉ:</strong> 45 Bạch Đằng, Q. Hải Châu, Đà Nẵng
              </p>
              <p style={{ color: '#999999', fontSize: '0.85rem' }}>
                Hotline: 0236 3777 999 • Giờ mở cửa: 08:30 - 21:30
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              backgroundColor: '#121212',
              border: '1px solid #222222',
              borderRadius: '16px',
              padding: '32px',
            }}
          >
            <h3 style={{ color: '#ffffff', fontSize: '1.4rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>
              GỬI YÊU CẦU TƯ VẤN BÁO GIÁ
            </h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
                <h4 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                  Gửi Yêu Cầu Thành Công!
                </h4>
                <p style={{ color: '#999999', fontSize: '0.9rem' }}>
                  Cảm ơn <strong>{form.name}</strong>. Giám đốc kinh doanh Indochine Mène sẽ liên hệ lại qua SĐT {form.phone} trong vòng 30 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Input
                  label="Họ và Tên *"
                  placeholder="Nhập họ tên của bạn"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  label="Số Điện Thoại *"
                  placeholder="Nhập số điện thoại"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
                <Input
                  label="Email liên hệ *"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <Input
                  label="Tên Doanh Nghiệp (Nếu mua quà tặng công ty)"
                  placeholder="Ví dụ: Tập đoàn ABC"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 500 }}>
                    Nội dung cần tư vấn *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ví dụ: Cần tư vấn 50 set quà Indochine Mène in logo doanh nghiệp..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#0d0b0c',
                      border: '1px solid #332b2e',
                      borderRadius: '8px',
                      color: '#f5f3f0',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <Button variant="gold" size="lg" fullWidth type="submit">
                  GỬI YÊU CẦU BÁO GIÁ VIP
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
