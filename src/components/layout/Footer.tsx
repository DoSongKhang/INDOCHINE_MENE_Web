import React from 'react';
import { Button } from '../common/Button';
import anh2_1 from "../../assets/images/wines/anh2_1.png"

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#050505',
        borderTop: '1px solid #222222',
        color: '#999999',
        marginTop: 'auto',
        fontSize: '0.9rem',
      }}
    >
      {/* VIP Newsletter Bar */}
      <div
        className="footer-newsletter-bar"
        style={{
          backgroundColor: '#121212',
          borderBottom: '1px solid #222222',
          padding: '40px 24px',
        }}
      >
        <div
          className="footer-newsletter-inner"
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
            <h3 className="footer-newsletter-title" style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-serif)', letterSpacing: '1px' }}>
              ĐĂNG KÝ NHẬN ĐẶC QUYỀN VIP INDOCHINE MÈNE
            </h3>
            <p style={{ color: '#999999', fontSize: '0.9rem' }}>
              Nhận thông báo bộ sưu tập Giới Hạn và thư mời tham dự các buổi VIP Wine Tasting riêng tư.
            </p>
          </div>
          <div className="footer-newsletter-form" style={{ display: 'flex', gap: '12px', minWidth: '320px', flex: '1 1 350px', maxWidth: '500px' }}>
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn..."
              style={{
                flex: 1,
                backgroundColor: '#080808',
                border: '1px solid #333333',
                borderRadius: '6px',
                padding: '12px 16px',
                color: '#ffffff',
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
      <div className="footer-main-links" style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
        <div
          className="footer-grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                <img src={anh2_1} alt="logo" />
              </span>
              <h2 style={{ fontSize: '1.5rem', color: '#ffffff', letterSpacing: '2px', fontFamily: 'var(--font-serif)' }}>INDOCHINE MÈNE</h2>
            </div>
            <p style={{ lineHeight: 1.7, marginBottom: '20px', color: '#999999' }}>
              Thương hiệu Prosecco &amp; Rượu vang cao cấp Pháp - Ý. Mang âm hưởng nghệ thuật Indochine cổ điển kết hợp tinh hoa bọt sủi thượng hạng.
            </p>
            <div style={{ color: '#ffffff', fontSize: '0.85rem' }}>
              <p>Hotline Đặt Hàng: <strong>0392006741</strong></p>
              <p>Email: <strong>khangdo.09102006@gmail.com</strong></p>
            </div>
          </div>

          {/* Showroom Systems */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              HỆ THỐNG SHOWROOM
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#999999' }}>
              <li>📍 <strong>Hà Nội:</strong> 88 Lý Thường Kiệt, Q. Hoàn Kiếm</li>
              <li>📍 <strong>TP. Hồ Chí Minh:</strong> 168 Nguyễn Huệ, Quận 1</li>
              <li>📍 <strong>Đà Nẵng:</strong> 45 Bạch Đằng, Q. Hải Châu</li>
              <li>🕒 Mở cửa: 08:30 - 21:30 (Tất cả các ngày trong tuần)</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#" style={{ color: '#999999' }}>• Chính Sách Bảo Quản &amp; Vận Chuyển Hỏa Tốc</a></li>
              <li><a href="#" style={{ color: '#999999' }}>• Hướng Dẫn Thưởng Thức Prosecco Chuẩn Vang Pháp Ý</a></li>
              <li><a href="#" style={{ color: '#999999' }}>• Dịch Vụ Khắc Tên Logo Doanh Nghiệp Lên Chai</a></li>
              <li><a href="#" style={{ color: '#999999' }}>• Chính Sách Đổi Trả &amp; Hóa Đơn VAT</a></li>
            </ul>
          </div>

          {/* Compliance & Responsible Drinking */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              THƯỞNG THỨC CÓ TRÁCH NHIỆM
            </h4>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: '#cccccc',
              }}
            >
              <p style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '6px' }}>🔞 Thông Báo Tuân Thủ Pháp Luật</p>
              Sản phẩm đồ uống có cồn chỉ dành cho người trên 18 tuổi. Không bán hàng cho người chưa đủ tuổi vị thành niên. Không điều khiển phương tiện giao thông sau khi uống rượu bia.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid #222222',
            marginTop: '40px',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.8rem',
            color: '#666666',
          }}
        >
          <p>© 2026 Đỗ Song Khang và NH</p>
          <p>French Vintage High Fashion E-Commerce</p>
        </div>
      </div>
    </footer>
  );
};
