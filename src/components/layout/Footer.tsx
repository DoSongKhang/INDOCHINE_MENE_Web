import React from 'react';
import { Button } from '../common/Button';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#090708',
        borderTop: '1px solid #2e2629',
        color: '#a39c97',
        marginTop: 'auto',
        fontSize: '0.9rem',
      }}
    >
      {/* VIP Newsletter Bar */}
      <div
        style={{
          backgroundColor: '#171315',
          borderBottom: '1px solid #2e2629',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.4rem', color: '#f5e6ab', marginBottom: '6px' }}>
              ĐĂNG KÝ NHẬN ĐẶC QUYỀN VIP KHỞI NIÊN
            </h3>
            <p style={{ color: '#a39c97', fontSize: '0.9rem' }}>
              Nhận thông báo bộ sưu tập Giới Hạn Tết 2026 và thư mời tham dự các buổi VIP Wine Tasting riêng tư.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', minWidth: '320px', flex: '1 1 350px', maxWidth: '500px' }}>
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn..."
              style={{
                flex: 1,
                backgroundColor: '#0d0b0c',
                border: '1px solid #332b2e',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#f5f3f0',
                outline: 'none',
              }}
            />
            <Button variant="gold" size="md">
              ĐĂNG KÝ
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #d4af37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d4af37',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                KN
              </span>
              <h2 style={{ fontSize: '1.4rem', color: '#f5e6ab', letterSpacing: '1px' }}>KHỞI NIÊN</h2>
            </div>
            <p style={{ lineHeight: 1.7, marginBottom: '20px', color: '#a39c97' }}>
              Thương hiệu Prosecco & Rượu vang cao cấp số 1 Việt Nam. Mang âm hưởng di sản Á Âu hội tụ vào từng giọt vang sủi bọt thượng hạng.
            </p>
            <div style={{ color: '#d4af37', fontSize: '0.85rem' }}>
              <p>Hotline Đặt Hàng: <strong>1900 888 999</strong></p>
              <p>Email: <strong>vip@khoinien.vn</strong></p>
            </div>
          </div>

          {/* Showroom Systems */}
          <div>
            <h4 style={{ color: '#d4af37', fontSize: '1.1rem', marginBottom: '20px', textTransform: 'uppercase' }}>
              HỆ THỐNG SHOWROOM
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>📍 <strong>Hà Nội:</strong> 88 Lý Thường Kiệt, Q. Hoàn Kiếm</li>
              <li>📍 <strong>TP. Hồ Chí Minh:</strong> 168 Nguyễn Huệ, Quận 1</li>
              <li>📍 <strong>Đà Nẵng:</strong> 45 Bạch Đằng, Q. Hải Châu</li>
              <li>🕒 Mở cửa: 08:30 - 21:30 (Tất cả các ngày trong tuần)</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 style={{ color: '#d4af37', fontSize: '1.1rem', marginBottom: '20px', textTransform: 'uppercase' }}>
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#" style={{ color: '#a39c97' }}>• Chính Sách Bảo Quản & Vận Chuyển Hỏa Tốc</a></li>
              <li><a href="#" style={{ color: '#a39c97' }}>• Hướng Dẫn Thưởng Thức Prosecco Chuẩn Vang Ý</a></li>
              <li><a href="#" style={{ color: '#a39c97' }}>• Dịch Vụ Khắc Tên Logo Doanh Nghiệp Lên Chai</a></li>
              <li><a href="#" style={{ color: '#a39c97' }}>• Chính Sách Đổi Trả & Hóa Đơn VAT</a></li>
            </ul>
          </div>

          {/* Compliance & Responsible Drinking */}
          <div>
            <h4 style={{ color: '#d4af37', fontSize: '1.1rem', marginBottom: '20px', textTransform: 'uppercase' }}>
              THƯỞNG THỨC CÓ TRÁCH NHIỆM
            </h4>
            <div
              style={{
                backgroundColor: 'rgba(114, 47, 55, 0.2)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '10px',
                padding: '16px',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: '#f5f3f0',
              }}
            >
              <p style={{ color: '#d4af37', fontWeight: 'bold', marginBottom: '6px' }}>🔞 Thông Báo Tuân Thủ Pháp Luật</p>
              Sản phẩm đồ uống có cồn chỉ dành cho người trên 18 tuổi. Không bán hàng cho người chưa đủ tuổi vị thành niên. Không điều khiển phương tiện giao thông sau khi uống rượu bia.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid #2e2629',
            marginTop: '40px',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.8rem',
            color: '#6e6b68',
          }}
        >
          <p>© 2026 KHỞI NIÊN VIỆT NAM. Bản quyền thuộc về Công ty Cổ phần Rượu Vang Khởi Niên.</p>
          <p>Thiết kế chuẩn Luxury E-commerce E-Shop</p>
        </div>
      </div>
    </footer>
  );
};
