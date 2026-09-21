import React, { useState } from 'react';
import type { WineItem } from '../../types/wine';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../common/Button';
import { useCart } from '../../hooks/useCart';

interface ProductDetailsProps {
  product: WineItem;
  onClose?: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        alignItems: 'start',
      }}
    >
      {/* Left Image Section */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#0d0b0c',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {product.isLimited && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: '#722f37',
              color: '#f5e6ab',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: 'bold',
              border: '1px solid #d4af37',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
              letterSpacing: '0.5px',
            }}
          >
            LIMITED EDITION
          </div>
        )}
      </div>

      {/* Right Details Section */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>
          {product.categoryName} • {product.origin}
        </span>

        <h2 style={{ fontSize: '1.8rem', color: '#f5e6ab', marginBottom: '8px', lineHeight: 1.3 }}>
          {product.name}
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#a39c97', marginBottom: '16px' }}>
          {product.subtitle}
        </p>

        {/* Rating & Review */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
          <span style={{ color: '#fbb450' }}>{'★'.repeat(Math.floor(product.rating))}</span>
          <span style={{ color: '#f5f3f0', fontWeight: 'bold' }}>{product.rating} / 5.0</span>
          <span style={{ color: '#6e6b68' }}>({product.reviewCount} đánh giá từ khách hàng VIP)</span>
        </div>

        {/* Price Box */}
        <div
          style={{
            backgroundColor: '#0d0b0c',
            border: '1px solid #332b2e',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'baseline',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fbb450' }}>
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '1rem', color: '#6e6b68', textDecoration: 'line-through' }}>
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Specification Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            fontSize: '0.85rem',
            marginBottom: '24px',
            backgroundColor: '#120f10',
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid #2e2629',
          }}
        >
          <div>🍇 <strong>Giống nho:</strong> {product.grape}</div>
          <div>🍾 <strong>Nồng độ (ABV):</strong> {product.abv}</div>
          <div>📍 <strong>Xuất xứ:</strong> {product.origin}</div>
          <div>🌡️ <strong>Nhiệt độ phục vụ:</strong> {product.tastingNotes.servingTemp}</div>
        </div>

        {/* Tasting Notes */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ color: '#d4af37', fontSize: '0.95rem', marginBottom: '10px', textTransform: 'uppercase' }}>
            🍷 HƯƠNG VỊ & TRẢI NGHIỆM TÁSTING NOTES
          </h4>
          <div style={{ fontSize: '0.85rem', color: '#a39c97', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p>🌸 <strong>Hương thơm:</strong> {product.tastingNotes.aroma.join(' • ')}</p>
            <p>✨ <strong>Vị giác:</strong> {product.tastingNotes.taste.join(' • ')}</p>
            <p>🍽️ <strong>Gợi ý kết hợp:</strong> {product.tastingNotes.pairing.join(' • ')}</p>
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0d0b0c',
              border: '1px solid #332b2e',
              borderRadius: '8px',
              padding: '4px',
            }}
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{ padding: '8px 14px', color: '#d4af37', fontSize: '1.1rem' }}
            >
              -
            </button>
            <span style={{ padding: '0 16px', color: '#f5f3f0', fontWeight: 'bold' }}>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{ padding: '8px 14px', color: '#d4af37', fontSize: '1.1rem' }}
            >
              +
            </button>
          </div>

          <Button variant="gold" size="lg" fullWidth onClick={() => addToCart(product, quantity)}>
            THÊM VÀO GIỎ - {formatCurrency(product.price * quantity)}
          </Button>
        </div>
      </div>
    </div>
  );
};
