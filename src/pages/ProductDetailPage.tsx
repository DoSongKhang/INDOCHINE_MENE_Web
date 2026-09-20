import React from 'react';
import { MOCK_WINES } from '../data/mockWines';
import { ProductDetails } from '../components/product/ProductDetails';

interface ProductDetailPageProps {
  productId?: string;
  onNavigate?: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const product = MOCK_WINES.find((w) => w.id === productId) || MOCK_WINES[0];

  return (
    <div style={{ backgroundColor: '#0d0b0c', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <button
          onClick={() => onNavigate && onNavigate('/products')}
          style={{
            color: '#d4af37',
            fontSize: '0.9rem',
            marginBottom: '30px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Quay lại danh sách sản phẩm
        </button>

        <div
          style={{
            backgroundColor: '#171315',
            border: '1px solid #332b2e',
            borderRadius: '20px',
            padding: '36px',
          }}
        >
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
};
