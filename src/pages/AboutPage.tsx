import React from 'react';
import { Button } from '../components/common/Button';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#ffffff', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 'bold' }}>
            HÀNH TRÌNH THƯƠNG HIỆU
          </span>
          <h1 style={{ fontSize: '2.8rem', color: '#ffffff', marginTop: '8px', lineHeight: 1.2, fontFamily: 'var(--font-serif)' }}>
            INDOCHINE MÈNE – TINH HOA NGHỆ THUẬT Á ÂU
          </h1>
          <div style={{ width: '80px', height: '2px', backgroundColor: '#ffffff', margin: '20px auto 0' }} />
        </div>

        {/* Story Section 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              Di Sản Bọt Sủi Prosecco Pháp - Ý
            </h2>
            <p style={{ color: '#999999', lineHeight: 1.8, marginBottom: '16px' }}>
              Thương hiệu <strong>Indochine Mène</strong> được sinh ra từ niềm đam mê lưu giữ những bọt sủi tăm li ti tinh khiết nhất của phong cách Pháp - Ý cổ điển, mang âm hưởng nghệ thuật Indochine đỉnh cao.
            </p>
            <p style={{ color: '#999999', lineHeight: 1.8 }}>
              Mỗi chùm nho Glera được tuyển chọn hoàn toàn thủ công trên những triền đồi dốc đứng ngập tràn ánh nắng Địa Trung Hải, trải qua phương pháp lên men khép kín ở nhiệt độ chuẩn xác 15°C để giữ trọn nốt hương hoa cỏ dại và trái cây tươi mát.
            </p>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ffffff', boxShadow: '0 10px 40px rgba(255, 255, 255, 0.1)' }}>
            <img
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80"
              alt="Indochine Mene Vineyard"
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Story Section 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          <div style={{ order: 2 }}>
            <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              Triết Lý Văn Hóa &amp; Nghệ Thuật Thưởng Thức
            </h2>
            <p style={{ color: '#999999', lineHeight: 1.8, marginBottom: '16px' }}>
              Tại Việt Nam, Indochine Mène không chỉ mang đến một loại đồ uống thượng hạng mà còn tạo dựng nghệ thuật quà tặng văn hóa Noir High Fashion. Dòng sản phẩm <strong>Heritage</strong> lấy hình ảnh hoa văn Đông Dương cổ điển làm nguồn cảm hứng cho sự thịnh vượng và quý phái.
            </p>
            <p style={{ color: '#999999', lineHeight: 1.8 }}>
              Tiếng nổ vang nhẹ nhàng khi khui nắp chai Indochine Mène là âm thanh mở đầu cho những thắng lợi mới, đánh dấu khoảnh khắc kết nối tình thân và hợp tác bền chặt giữa các đối tác kinh doanh.
            </p>
          </div>

          <div style={{ order: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid #222222' }}>
            <img
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
              alt="Indochine Mene Heritage Art"
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            backgroundColor: '#121212',
            border: '1px solid #ffffff',
            borderRadius: '16px',
            padding: '48px 32px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
            TRẢI NGHIỆM HƯƠNG VỊ INDOCHINE MÈNE THƯỢNG HẠNG
          </h2>
          <Button variant="gold" size="lg" onClick={() => onNavigate && onNavigate('/products')}>
            KHÁM PHÁ CỬA HÀNG INDOCHINE MÈNE
          </Button>
        </div>
      </div>
    </div>
  );
};
