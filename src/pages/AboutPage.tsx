import React from 'react';
import { Button } from '../components/common/Button';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ backgroundColor: '#0d0b0c', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 'bold' }}>
            HÀNH TRÌNH THƯƠNG HIỆU
          </span>
          <h1 style={{ fontSize: '3rem', color: '#f5e6ab', marginTop: '8px', lineHeight: 1.2 }}>
            KHỞI NIÊN – NƠI TINH HOA Á ÂU HỘI TỤ
          </h1>
          <div style={{ width: '80px', height: '2px', backgroundColor: '#d4af37', margin: '20px auto 0' }} />
        </div>

        {/* Story Section 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h2 style={{ color: '#f5e6ab', fontSize: '2rem', marginBottom: '16px' }}>
              Di Sản Prosecco Superiore Nước Ý
            </h2>
            <p style={{ color: '#a39c97', lineHeight: 1.8, marginBottom: '16px' }}>
              Thương hiệu <strong>Khởi Niên</strong> được sinh ra từ niềm đam mê lưu giữ những bọt sủi tăm li ti tinh khiết nhất của vùng đất Valdobbiadene, Veneto – trái tim của dòng Prosecco nước Ý đạt chứng nhận phẩm cấp cao nhất DOCG.
            </p>
            <p style={{ color: '#a39c97', lineHeight: 1.8 }}>
              Mỗi chùm nho Glera được tuyển chọn hoàn toàn thủ công trên những triền đồi dốc đứng ngập tràn ánh nắng Địa Trung Hải, trải qua phương pháp lên men Charmat khép kín ở nhiệt độ chuẩn xác 15°C để giữ trọn nốt hương hoa cỏ dại và trái cây tươi mát.
            </p>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #d4af37', boxShadow: '0 10px 40px rgba(212, 175, 55, 0.2)' }}>
            <img
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80"
              alt="Khoi Nien Vineyard"
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Story Section 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          <div style={{ order: 2 }}>
            <h2 style={{ color: '#f5e6ab', fontSize: '2rem', marginBottom: '16px' }}>
              Triết Lý Văn Hóa & Nghệ Thuật Thưởng Thức
            </h2>
            <p style={{ color: '#a39c97', lineHeight: 1.8, marginBottom: '16px' }}>
              Tại Việt Nam, Khởi Niên không chỉ mang đến một loại đồ uống thượng hạng mà còn tạo dựng nghệ thuật quà tặng văn hóa. Dòng sản phẩm <strong>Cultural Heritage</strong> lấy hình ảnh hoa mẫu đơn, cánh én chao liệng và hoa đào Tết làm nguồn cảm hứng cho sự thịnh vượng, hanh thông trong năm mới.
            </p>
            <p style={{ color: '#a39c97', lineHeight: 1.8 }}>
              Tiếng nổ vang nhẹ nhàng khi khui nắp chai Khởi Niên là âm thanh mở đầu cho những thắng lợi mới, đánh dấu khoảnh khắc kết nối tình thân và hợp tác bền chặt giữa các đối tác kinh doanh.
            </p>
          </div>

          <div style={{ order: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid #332b2e' }}>
            <img
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
              alt="Khoi Nien Heritage Art"
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            backgroundColor: '#171315',
            border: '1px solid #d4af37',
            borderRadius: '20px',
            padding: '48px 32px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '2.2rem', color: '#f5e6ab', marginBottom: '16px' }}>
            TRẢI NGHIỆM HƯƠNG VỊ KHỞI NIÊN THƯỢNG HẠNG
          </h2>
          <p style={{ color: '#a39c97', maxWidth: '650px', margin: '0 auto 28px' }}>
            Khám phá bộ sưu tập Prosecco, Sparkling Gold 23K và Hộp Quà Tết đính kèm ly pha lê cao cấp ngay hôm nay.
          </p>
          <Button variant="gold" size="lg" onClick={() => onNavigate && onNavigate('/products')}>
            KHÁM PHÁ CỬA HÀNG KHỞI NIÊN
          </Button>
        </div>
      </div>
    </div>
  );
};
