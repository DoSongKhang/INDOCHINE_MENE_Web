import React, { useState, useEffect } from 'react';
import { MOCK_WINES } from '../data/mockWines';
import type { WineItem } from '../types/wine';
import { useFilter } from '../hooks/useFilter';
import { ProductFilter } from '../components/product/ProductFilter';
import { ProductGrid } from '../components/product/ProductGrid';
import { Modal } from '../components/common/Modal';
import { ProductDetails } from '../components/product/ProductDetails';

export const ProductsPage: React.FC = () => {
  const { filter, setCategory, setSearchQuery, setSortBy, resetFilters, filteredWines } =
    useFilter(MOCK_WINES);

  const [selectedProduct, setSelectedProduct] = useState<WineItem | null>(null);

  useEffect(() => {
    // Check URL params if present
    const hash = window.location.hash;
    if (hash.includes('cat=giftset')) {
      setCategory('giftset');
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#0d0b0c', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Page Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: 'bold' }}>
            KHỞI NIÊN PROSECCO & WINE SELECTION
          </span>
          <h1 style={{ fontSize: '2.8rem', color: '#f5e6ab', marginTop: '6px' }}>
            BỘ SƯU TẬP RƯỢU VANG & PROSECCO CAO CẤP
          </h1>
          <p style={{ color: '#a39c97', maxWidth: '600px', margin: '12px auto 0', fontSize: '0.95rem' }}>
            Khám phá những dòng vang sủi bọt Prosecco Superiore DOCG, Sparkling dát vàng 23K và các bộ Hộp Quà Biếu Tết sang trọng bậc nhất.
          </p>
        </div>

        {/* Filter Toolbar */}
        <ProductFilter
          filter={filter}
          onCategoryChange={setCategory}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onReset={resetFilters}
          totalCount={filteredWines.length}
        />

        {/* Product Grid */}
        <ProductGrid products={filteredWines} onQuickView={(p) => setSelectedProduct(p)} />

        {/* Quick View Modal */}
        <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </Modal>
      </div>
    </div>
  );
};
