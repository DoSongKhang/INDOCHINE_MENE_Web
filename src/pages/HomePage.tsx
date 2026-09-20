import React, { useState } from 'react';
import { MOCK_WINES } from '../data/mockWines';
import type { WineItem } from '../types/wine';
import { ProductGrid } from '../components/product/ProductGrid';
import { Modal } from '../components/common/Modal';
import { ProductDetails } from '../components/product/ProductDetails';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../hooks/useCart';
import video from "../assets/images/wines/video1.mp4"

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
      title: 'INDOCHINE MÈNE HERITAGE',
      subtitle: 'NƠI TINH HOA Á ÂU HỘI TỤ • BẢN GIỚI HẠN VINTAGE',
      type: 'video', // Đánh dấu đây là video
      src: video,    // Đường dẫn file video đã import
      description: 'Sự kết hợp hoàn hảo giữa kỹ nghệ bọt sủi tinh tế và ngôn ngữ thiết kế Indochine Pháp cổ điển kiêu sa.',
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
        {heroSlides[heroSlide].type === 'video' ? (
          <video
            src={heroSlides[heroSlide].src}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(1.1)',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${heroSlides[heroSlide].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(1.1)',
              transition: 'background-image 0.8s ease-in-out',
            }}
          />
        )}

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
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '680px',
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            {heroSlides[heroSlide].description}
          </p>


          {/* Slider Dots */}
        </div>
      </section>

      {/* 2. CULTURAL HERITAGE FEATURED SPOTLIGHT */}
      <section style={{ backgroundColor: '#120f10', padding: '90px 24px', borderTop: '1px solid #2e2629' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Left Story Text */}
            <div>
              <span style={{ color: '#ffffff', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>
                INDOCHINE HERITAGE
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#ffffff', marginTop: '8px', marginBottom: '20px', lineHeight: 1.2, fontFamily: 'var(--font-serif)' }}>
                HERITAGE GIFT – HỒN VIỆT
              </h2>
              <p style={{ color: '#999999', lineHeight: 1.8, marginBottom: '24px', fontSize: '1rem' }}>
                Hồn Việt là bộ quà tặng cao cấp của <strong>INDOCHINE MÈNE,</strong> được thiết kế dành cho doanh nghiệp, đối tác, khách hàng VIP và những dịp tri ân đặc biệt. Bộ quà kết hợp 01 bình rượu gốm Heritage 500ml, 02 chén gốm thủ công, hộp quà phong cách Indochine, thiệp lời chúc và câu chuyện làng nghề. Doanh nghiệp có thể tùy chọn khắc tên, logo hoặc thông điệp riêng, tạo dấu ấn cho từng món quà. Điểm đặc biệt của combo là sự kết nối giữa men rượu và men gốm, giữa làng nghề truyền thống Việt với thiết kế hiện đại, biến món quà thành một sản phẩm vừa có giá trị sử dụng, vừa mang giá trị văn hóa và trưng bày.
              </p>
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
                  ĐẶT HÀNG NGAY
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
              XEM TOÀN BỘ BỘ SƯU TẬP INDOCHINE MÈNE →
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
