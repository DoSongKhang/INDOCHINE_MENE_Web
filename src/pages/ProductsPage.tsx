import React, { useState, useEffect } from 'react';
import { MOCK_WINES } from '../data/mockWines';
import type { WineItem } from '../types/wine';
import { useFilter } from '../hooks/useFilter';
import { ProductFilter } from '../components/product/ProductFilter';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductShowcaseSlider } from '../components/product/ProductShowcaseSlider';
import { Modal } from '../components/common/Modal';
import { ProductDetails } from '../components/product/ProductDetails';
import { LuSparkles, LuLayoutGrid } from 'react-icons/lu';

interface ProductsPageProps {
  currentPath?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ currentPath }) => {
  // Determine if viewing Gift Set section
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const activePath = currentPath || hash.replace('#', '');
  const isGiftSet = activePath.includes('cat=giftset') || activePath.includes('/giftset');

  // Filter items: only 'giftset' on Gift Set page, only wine bottles (non-giftset) on Products page
  const baseWines = React.useMemo(() => {
    if (isGiftSet) {
      return MOCK_WINES.filter((w) => w.category === 'giftset');
    }
    return MOCK_WINES.filter((w) => w.category !== 'giftset');
  }, [isGiftSet]);

  const { filter, setSearchQuery, setSortBy, resetFilters, filteredWines } =
    useFilter(baseWines);

  // Reset filters whenever switching between Gift Set and Products
  useEffect(() => {
    resetFilters();
  }, [isGiftSet]);

  const [selectedProduct, setSelectedProduct] = useState<WineItem | null>(null);
  const [viewMode, setViewMode] = useState<'showcase' | 'grid'>('showcase');

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Page Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#ffffff', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>
            {isGiftSet ? 'INDOCHINE MÈNE LUXURY GIFT SET COLLECTION' : 'INDOCHINE MÈNE PROSECCO & FINE WINES'}
          </span>
          <h1 style={{ fontSize: '2.8rem', color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-serif)' }}>
            {isGiftSet ? 'BỘ SƯU TẬP HỘP QUÀ TẾT & GIFT SET CAO CẤP' : 'BỘ SƯU TẬP RƯỢU VANG & PROSECCO CAO CẤP'}
          </h1>
          <p style={{ color: '#999999', maxWidth: '650px', margin: '12px auto 0', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {isGiftSet
              ? 'Khám phá các bộ Hộp Quà Biếu Tết, quà tặng doanh nghiệp và đối tác VIP mang đậm dấu ấn tinh hoa bản sắc Việt kết hợp thiết kế sang trọng đẳng cấp.'
              : 'Khám phá những dòng rượu vang và thức uống Indochine Mène thượng hạng mang đậm phong vị Á - Âu tuyển chọn.'}
          </p>
        </div>

        {/* Filter Toolbar */}
        <ProductFilter
          filter={filter}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onReset={resetFilters}
          totalCount={filteredWines.length}
        />

        {/* View Mode Toggle Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            backgroundColor: '#101010',
            border: '1px solid #262626',
            borderRadius: '12px',
            padding: '12px 20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ color: '#aaaaaa', fontSize: '0.9rem' }}>
            Hiển thị <strong style={{ color: '#ffffff' }}>{filteredWines.length}</strong> sản phẩm tinh tuyển
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#777777', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Chế độ xem:
            </span>
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: '#181818',
                padding: '3px',
                borderRadius: '8px',
                border: '1px solid #2a2a2a',
              }}
            >
              <button
                onClick={() => setViewMode('showcase')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: viewMode === 'showcase' ? '#ffffff' : 'transparent',
                  color: viewMode === 'showcase' ? '#000000' : '#888888',
                  boxShadow: viewMode === 'showcase' ? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
                }}
              > <span><LuSparkles /></span>
                Trình Diễn (Showcase)
              </button>

              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                  color: viewMode === 'grid' ? '#000000' : '#888888',
                  boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
                }}
              >
                <span><LuLayoutGrid /></span> Dạng Lưới (Grid)
              </button>
            </div>
          </div>
        </div>

        {/* Product Display: Showcase vs Grid */}
        {viewMode === 'showcase' ? (
          <ProductShowcaseSlider
            products={filteredWines}
            onQuickView={(p) => setSelectedProduct(p)}
          />
        ) : (
          <ProductGrid products={filteredWines} onQuickView={(p) => setSelectedProduct(p)} />
        )}

        {/* Quick View Modal */}
        <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </Modal>
      </div>
    </div>
  );
};

