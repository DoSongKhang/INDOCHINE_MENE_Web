import React from 'react';
import type { WineItem } from '../../types/wine';
import { formatCurrency } from '../../utils/formatCurrency';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: WineItem;
  onQuickView?: (product: WineItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  return (
    <div
      style={{
        backgroundColor: '#171315',
        border: '1px solid #332b2e',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="gold-border-glow"
    >
      {/* Badges Overlay */}

      {/* Wine Bottle Image Box */}
      <div
        style={{
          position: 'relative',
          paddingTop: '110%',
          backgroundColor: '#0f0d0e',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => onQuickView && onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          className="product-img-hover"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(23, 19, 21, 0.9) 0%, transparent 50%)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            fontSize: '0.75rem',
            color: '#d4af37',
            backgroundColor: 'rgba(13, 11, 12, 0.8)',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
          }}
        >
          {product.abv} • {product.volume}
        </span>
      </div>

      {/* Content Box */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.75rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
          {product.categoryName} • {product.origin.split(',')[0]}
        </div>

        <h3
          onClick={() => onQuickView && onQuickView(product)}
          style={{
            fontSize: '1.15rem',
            color: '#f5e6ab',
            lineHeight: 1.35,
            marginBottom: '6px',
            cursor: 'pointer',
            height: '2.7em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: '0.8rem',
            color: '#a39c97',
            marginBottom: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {product.subtitle}
        </p>

        {/* Rating Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontSize: '0.8rem' }}>
          <span style={{ color: '#fbb450' }}>{'★'.repeat(Math.floor(product.rating))}</span>
          <span style={{ color: '#f5f3f0', fontWeight: 'bold' }}>{product.rating}</span>
          <span style={{ color: '#6e6b68' }}>({product.reviewCount})</span>
        </div>

        {/* Price & Actions */}
        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #2e2629' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fbb450' }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.85rem', color: '#6e6b68', textDecoration: 'line-through' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Button variant="outline" size="sm" onClick={() => onQuickView && onQuickView(product)}>
              XEM CHI TIẾT
            </Button>
            <Button variant="gold" size="sm" onClick={() => addToCart(product, 1)}>
              + GIỎ HÀNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
