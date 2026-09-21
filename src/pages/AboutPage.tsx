import React from 'react';
import p1 from "../assets/images/wines/p1.jpg"
import p2 from "../assets/images/wines/p2.jpg"
import p3 from "../assets/images/wines/p3.jpg"
interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '80vh', padding: '60px 24px' }}>
      <style>{`
        .about-story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 80px;
        }
        @media (min-width: 768px) {
          .about-story-grid {
            grid-template-columns: 1fr 1fr;
          }
          .about-story-reverse .about-story-text {
            order: 2;
          }
          .about-story-reverse .about-story-img {
            order: 1;
          }
        }
      `}</style>
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
        <div className="about-story-grid">
          <div>
            <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              SỰ RA ĐỜI CỦA INDOCHINE MÈNE NƠI HAI “MEN” GẶP NHAU
            </h2>
            <p style={{ color: '#999999', lineHeight: 1.8, marginBottom: '16px' }}>
              <strong>Indochine Mène</strong> bắt đầu từ mong muốn đưa những giá trị làng nghề Việt vào một sản phẩm mang hơi thở hiện đại. Ý tưởng được hình thành từ sự kết nối giữa rượu thủ công truyền thống và nghề gốm Việt Nam. Một bên là men rượu lưu giữ hương vị và kỹ nghệ của người làm nghề; một bên là men gốm lưu giữ dấu ấn của đất, lửa và bàn tay nghệ nhân. <strong>Indochine Mène</strong> kết nối hai giá trị ấy với phong cách Indochine, tạo nên những sản phẩm vừa mang bản sắc Việt, vừa có diện mạo thanh lịch và hiện đại, phù hợp cho thưởng thức, trưng bày và quà tặng.
            </p>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ffffff', boxShadow: '0 10px 40px rgba(255, 255, 255, 0.1)' }}>
            <img
              src={p1}
              alt="Indochine Mene Vineyard"
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Story Section 2 */}
        <div className="about-story-grid about-story-reverse">
          <div className="about-story-text">
            <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              CÂU CHUYỆN ĐẰNG SAU TÊN GỌI INDOCHINE & MÈNE
            </h2>
            <p style={{ color: '#999999', lineHeight: 1.8, marginBottom: '16px' }}>
              <strong>Indochine Mène</strong> lấy cảm hứng từ tên gọi Đông Dương trong tiếng Pháp và được thương hiệu sử dụng để gợi lên tinh thần giao thoa giữa thẩm mỹ Pháp và bản sắc Việt Nam. Đó cũng là ngôn ngữ thiết kế mà thương hiệu lựa chọn: cổ điển, thanh lịch nhưng được thể hiện theo cách hiện đại. <strong>Mène</strong> là tên gọi được biến tấu từ ý tưởng về chữ “men” – một từ kết nối hai giá trị cốt lõi của dự án: men rượu và men gốm. Khi kết hợp lại, <strong>Indochine Mène</strong> kể câu chuyện về một thương hiệu mang <strong>"Men Việt"</strong> bên trong và <strong>“Dáng Tây”</strong> bên ngoài – nơi giá trị truyền thống được gìn giữ nhưng được kể lại bằng một ngôn ngữ mới. <strong>INDOCHINE MÈNE — Men Việt, Dáng Tây.</strong>
            </p>
          </div>

          <div className="about-story-img" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ffffff', boxShadow: '0 10px 40px rgba(255, 255, 255, 0.1)' }}>
            <img
              src={p2}
              alt="Indochine Mene Heritage Art"
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Story Section 3 */}
        <div className="about-story-grid">
          <div>
            <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              DẤU ẤN HOA SEN MỘT BIỂU TƯỢNG – MỘT BẢN SẮC
            </h2>
            <p style={{ color: '#999999', lineHeight: 1.8, marginBottom: '16px' }}>
              Logo <strong>Indochine Mène</strong> được xây dựng từ hình ảnh hoa sen cách điệu, lựa chọn để tạo dấu ấn Việt Nam trong một hệ nhận diện mang phong cách <strong>Indochine.</strong> Những đường nét của hoa sen được tối giản và cân xứng, giúp biểu tượng vừa giữ được nét truyền thống vừa mang cảm giác hiện đại, cao cấp. Sắc vàng đồng tạo sự liên tưởng đến vẻ đẹp cổ điển, thủ công và sang trọng của thương hiệu.
            </p>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ffffff', boxShadow: '0 10px 40px rgba(255, 255, 255, 0.1)' }}>
            <img
              src={p3}
              alt="Indochine Mene Vineyard"
              style={{ width: '100%', height: '380px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
