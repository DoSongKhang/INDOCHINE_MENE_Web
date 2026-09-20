import React from 'react';
import type { WineItem } from '../../types/wine';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: WineItem[];
  onQuickView?: (product: WineItem) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onQuickView }) => {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#171315',
          borderRadius: '16px',
          border: '1px solid #332b2e',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍷</div>
        <h3 style={{ color: '#f5e6ab', fontSize: '1.3rem', marginBottom: '8px' }}>
          Không Tìm Thấy Sản Phẩm Phù Hợp
        </h3>
        <p style={{ color: '#a39c97', fontSize: '0.9rem' }}>
          Vui lòng thử tìm kiếm lại với từ khóa khác hoặc bỏ chọn bộ lọc.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
};
