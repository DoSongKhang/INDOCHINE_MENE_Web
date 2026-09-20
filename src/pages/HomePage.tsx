import React, { useState } from 'react';
import { MOCK_WINES } from '../data/mockWines';
import type { WineItem } from '../types/wine';
import { ProductGrid } from '../components/product/ProductGrid';
import { Modal } from '../components/common/Modal';
import { ProductDetails } from '../components/product/ProductDetails';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';

interface HomePageProps {
  onNavigate?: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<WineItem | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);

  const heritageWine = MOCK_WINES.find((w) => w.id === 'khoi-nien-heritage-limited') || MOCK_WINES[0];
  const featuredWines = MOCK_WINES.slice(0, 6);

  const heroSlides = [
    {
      title: 'KHỞI NIÊN CULTURAL HERITAGE',
      subtitle: 'NƠI TINH HOA Á ÂU HỘI TỤ • BẢN GIỚI HẠN TẾT 2026',
      bgImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80',
      description: 'Sự kết hợp hoàn hảo giữa kỹ nghệ Prosecco Ý thượng hạng và họa tiết hoa mẫu đơn, cánh én chao liệng ngày Tết Việt.',
    },
    {
      title: 'PROSECCO SUPERIORE DOCG',
      subtitle: 'BỌT SỦI TĂM LI TI TƯƠI MÁT SỐ 1 VIỆT NAM',
      bgImage: 'https://images.unsplash.com/photo-1558001373-7b9fcc98f0b7?auto=format&fit=crop&w=1600&q=80',
      description: 'Trải nghiệm hương vị tinh khiết đỉnh cao từ những chùm nho Glera được thu hoạch thủ công vùng Valdobbiadene, Ý.',
    },
    {
      title: 'SPARKLING GOLD 23K LUXURY',
      subtitle: 'TÁCH BIỆT & KHỞI ĐẦU SỰ THỊNH VƯỢNG',
      bgImage: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=1600&q=80',
      description: 'Vang sủi dát vàng 23K lấp lánh - Lựa chọn kiêu sa tôn vinh chiến thắng trong những đại tiệc trọng đại.',
    },
  ];

  return (
    <div>
      {/* 1. HERO SLIDER BANNER */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#090708',
        }}
      >
        {/* Background Image Container */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroSlides[heroSlide].bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            transition: 'background-image 0.8s ease-in-out',
          }}
        />

        {/* Ambient Overlay Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, rgba(114, 47, 55, 0.3) 0%, rgba(9, 7, 8, 0.85) 80%)',
          }}
        />

        {/* Hero Content Box */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '900px',
            margin: '0 auto',
            padding: '40px 24px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              color: '#d4af37',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              padding: '6px 18px',
              borderRadius: '20px',
              backgroundColor: 'rgba(13, 11, 12, 0.6)',
            }}
          >
            {heroSlides[heroSlide].subtitle}
          </span>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              color: '#f5e6ab',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.15,
              marginBottom: '20px',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            {heroSlides[heroSlide].title}
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#e2dad5',
              maxWidth: '680px',
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            {heroSlides[heroSlide].description}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="gold"
              size="lg"
              onClick={() => onNavigate && onNavigate('/products')}
            >
              KHÁM PHÁ BỘ SƯU TẬP
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate && onNavigate('/contact')}
            >
              BÁO GIÁ QUÀ TẾT DOANH NGHIỆP
            </Button>
          </div>

          {/* Slider Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '48px' }}>
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroSlide(idx)}
                style={{
                  width: idx === heroSlide ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: idx === heroSlide ? '#d4af37' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. CULTURAL HERITAGE FEATURED SPOTLIGHT */}
      <section style={{ backgroundColor: '#120f10', padding: '90px 24px', borderTop: '1px solid #2e2629' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Left Story Text */}
            <div>
              <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>
                CULTURAL HERITAGE
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#f5e6ab', marginTop: '8px', marginBottom: '20px', lineHeight: 1.2 }}>
                NƠI TINH HOA Á ÂU HỘI TỤ
              </h2>
              <p style={{ color: '#a39c97', lineHeight: 1.8, marginBottom: '24px', fontSize: '1rem' }}>
                Mang âm hưởng mùa xuân Á Âu vào món quà Tết, <strong>Cultural Heritage của Khởi Niên</strong> là bản giao hưởng tuyệt vời của sắc màu và hương vị. Hình ảnh mùa xuân châu Âu được tô điểm cùng họa tiết hoa mẫu đơn, cánh én chao liệng và hoa đào Tết Việt Nam – biểu tượng của may mắn, thịnh vượng và bình an năm mới.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f5f3f0' }}>
                  <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>✦</span> 2 Chai Prosecco Superiore DOCG mạ vàng 24K
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f5f3f0' }}>
                  <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>✦</span> 2 Ly pha lê chân cao chuyên dụng thưởng thức bọt sủi
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f5f3f0' }}>
                  <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>✦</span> Hộp quà da sơn mài cao cấp ép kim logo Khởi Niên
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fbb450' }}>
                    {formatCurrency(heritageWine.price)}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#6e6b68', textDecoration: 'line-through' }}>
                    {formatCurrency(heritageWine.originalPrice || 3800000)}
                  </div>
                </div>
                <Button variant="gold" size="lg" onClick={() => addToCart(heritageWine, 1)}>
                  ĐẶT HÀNG GIFT SET NGAY
                </Button>
              </div>
            </div>

            {/* Right Product Card Visual */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #d4af37',
                  boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2)',
                }}
              >
                <img
                  src={heritageWine.image}
                  alt={heritageWine.name}
                  style={{ width: '100%', height: '520px', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    background: 'linear-gradient(to top, rgba(13, 11, 12, 0.95), transparent)',
                  }}
                >
                  <span style={{ color: '#d4af37', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    Bản Giới Hạn Tết 2026
                  </span>
                  <h3 style={{ color: '#f5e6ab', fontSize: '1.3rem' }}>{heritageWine.name}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG */}
      <section style={{ backgroundColor: '#0d0b0c', padding: '90px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>
              DANH MỤC TUYỂN CHỌN
            </span>
            <h2 style={{ fontSize: '2.5rem', color: '#f5e6ab', marginTop: '6px' }}>
              PROSECCO & RƯỢU VANG BÁN CHẠY NHẤT
            </h2>
            <div style={{ width: '80px', height: '2px', backgroundColor: '#d4af37', margin: '16px auto 0' }} />
          </div>

          <ProductGrid products={featuredWines} onQuickView={(p) => setSelectedProduct(p)} />

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate && onNavigate('/products')}
            >
              XEM TOÀN BỘ BỘ SƯU TẬP KHỞI NIÊN →
            </Button>
          </div>
        </div>
      </section>

      {/* 4. BRAND CRAFTSMANSHIP & METRICS */}
      <section
        style={{
          backgroundColor: '#171315',
          borderTop: '1px solid #2e2629',
          borderBottom: '1px solid #2e2629',
          padding: '70px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '30px',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '2.8rem', color: '#fbb450', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>
                63
              </div>
              <div style={{ color: '#d4af37', fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                TỈNH THÀNH PHÂN PHỐI
              </div>
              <p style={{ color: '#a39c97', fontSize: '0.8rem', marginTop: '6px' }}>
                Hệ thống showroom & đại lý ủy quyền toàn quốc.
              </p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '2.8rem', color: '#fbb450', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>
                500+
              </div>
              <div style={{ color: '#d4af37', fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                KHÁCH SẠN & NHÀ HÀNG 5 SAO
              </div>
              <p style={{ color: '#a39c97', fontSize: '0.8rem', marginTop: '6px' }}>
                Đối tác uy tín hàng đầu trong danh mục vang sủi cao cấp.
              </p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '2.8rem', color: '#fbb450', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>
                100%
              </div>
              <div style={{ color: '#d4af37', fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                NHO GLERA DOCG Ý
              </div>
              <p style={{ color: '#a39c97', fontSize: '0.8rem', marginTop: '6px' }}>
                Nhập khẩu chính ngạch nguyên chai từ vùng Veneto.
              </p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '2.8rem', color: '#fbb450', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>
                24/7
              </div>
              <div style={{ color: '#d4af37', fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                HỖ TRỢ TƯ VẤN THƯỞNG THỨC
              </div>
              <p style={{ color: '#a39c97', fontSize: '0.8rem', marginTop: '6px' }}>
                Đội ngũ Sommelier tư vấn chọn vang phù hợp khẩu vị.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && <ProductDetails product={selectedProduct} />}
      </Modal>
    </div>
  );
};
