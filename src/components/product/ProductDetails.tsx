import React, { useState } from 'react';
import type { WineItem } from '../../types/wine';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../common/Button';
import { useCart } from '../../hooks/useCart';
import {
  LuSparkles,
  LuShieldCheck,
  LuTruck,
  LuGift,
  LuShoppingBag,
  LuCheck,
  LuStar,
  LuHeart,
} from 'react-icons/lu';

interface ProductDetailsProps {
  product: WineItem;
  onClose?: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  // Combine aroma and taste into concise highlight tags (up to 4 tags max)
  const highlightTags = [
    ...(product.tastingNotes?.aroma || []).map((t) => ({ icon: '🌸', text: t })),
    ...(product.tastingNotes?.taste || []).map((t) => ({ icon: '🍷', text: t })),
  ].slice(0, 4);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
        gap: '24px',
        alignItems: 'stretch',
      }}
      className="product-details-responsive-grid"
    >
      {/* ========================================================
          LEFT: Luxury Showcase Image Box (Takes full vertical height)
          ======================================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          className="product-detail-img-box"
          style={{
            position: 'relative',
            flex: 1,
            minHeight: '360px',
            borderRadius: '14px',
            overflow: 'hidden',
            backgroundColor: '#0d0b0c',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Subtle center gold glow behind bottle */}
          <div
            style={{
              position: 'absolute',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            className="hover:scale-105"
          />

          {/* Top Badges */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 5,
            }}
          >
            {product.isHot && !product.isLimited && (
              <span
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                }}
              >
                HOT PRODUCT
              </span>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================
          RIGHT: Clean, Rich Information & Action Area
          ======================================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, justifyContent: 'space-between' }}>
        <div>
          {/* Category & Origin Line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#d4af37',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                fontWeight: 700,
              }}
            >
              {product.categoryName}
            </span>
            {product.origin && (
              <>
                <span style={{ color: '#555555', fontSize: '0.7rem' }}>•</span>
                <span style={{ fontSize: '0.72rem', color: '#9e9e9e', letterSpacing: '0.5px' }}>
                  {product.origin}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              lineHeight: 1.25,
              color: '#ffffff',
              fontWeight: 700,
              marginBottom: '6px',
              letterSpacing: '0.3px',
            }}
          >
            {product.name}
          </h2>

          {/* Subtitle if available */}
          {product.subtitle && (
            <p style={{ fontSize: '0.8rem', color: '#9e9e9e', fontStyle: 'italic', marginBottom: '8px' }}>
              {product.subtitle}
            </p>
          )}

          {/* Rating Line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              fontSize: '0.8rem',
              flexWrap: 'nowrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => (
                <LuStar
                  key={i}
                  size={13}
                  fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                  stroke="#f59e0b"
                />
              ))}
            </div>
            <span style={{ color: '#ffffff', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {product.rating.toFixed(1)} / 5.0
            </span>
            <span style={{ color: '#777777', whiteSpace: 'nowrap' }}>
              ({product.reviewCount} đánh giá VIP)
            </span>
          </div>

          {/* Price Card */}
          <div
            style={{
              backgroundColor: '#120f11',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '10px 14px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#f5e6ab',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.5px',
                }}
              >
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: '#6e6b68',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {discountPercent && (
              <span
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#f5e6ab',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                }}
              >
                TIẾT KIỆM {discountPercent}%
              </span>
            )}
          </div>

          {/* Short Description */}
          {product.description && (
            <p
              style={{
                fontSize: '0.8rem',
                color: '#a8a29e',
                lineHeight: 1.5,
                marginBottom: '12px',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.description}
            </p>
          )}

          {/* Tasting / Gift Highlights in neat flow */}

        </div>

        {/* Quantity Stepper & Add to Cart Action Bar (Pinned cleanly to bottom) */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid #262224',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Responsive Action Container */}
          <div className="product-details-action-container">
            {/* Stepper + Mobile Subtotal */}
            <div className="product-details-stepper-row">
              <span className="product-details-stepper-label">
                Số lượng:
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#0d0b0c',
                  border: '1px solid #332b2e',
                  borderRadius: '8px',
                  height: '42px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Giảm số lượng"
                  style={{
                    width: '36px',
                    height: '100%',
                    color: quantity <= 1 ? '#444444' : '#d4af37',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (quantity > 1) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    minWidth: '32px',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Tăng số lượng"
                  style={{
                    width: '36px',
                    height: '100%',
                    color: '#d4af37',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  +
                </button>
              </div>

              {/* Mobile Only Subtotal Display */}
              <div className="product-details-mobile-subtotal">
                <span style={{ fontSize: '0.75rem', color: '#888888' }}>Tạm tính:</span>
                <strong style={{ color: '#f5e6ab', fontSize: '1rem', fontFamily: 'var(--font-sans)' }}>
                  {formatCurrency(product.price * quantity)}
                </strong>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="product-details-btn-wrapper">
              <Button
                variant="gold"
                size="md"
                fullWidth
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{
                  height: '42px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: "12px",
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  backgroundColor: isAdded ? '#15803d' : '#ffffff',
                  color: isAdded ? '#ffffff' : '#050505',
                  borderColor: isAdded ? '#22c55e' : '#ffffff',
                  boxShadow: isAdded
                    ? '0 0 16px rgba(34, 197, 94, 0.5)'
                    : '0 4px 16px rgba(255, 255, 255, 0.15)',
                }}
              >
                {isAdded ? (
                  <>
                    <LuCheck size={16} />
                    ĐÃ THÊM VÀO GIỎ!
                  </>
                ) : (
                  <>
                    <LuShoppingBag size={16} />
                    THÊM VÀO GIỎ • {formatCurrency(product.price * quantity)}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Bottom subtle note */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.68rem',
              color: '#6e6b68',
            }}
          >
            <span>✓ Đã gồm VAT & Hộp quà thiết kế riêng</span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  color: '#9e9e9e',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.68rem',
                }}
              >
                Tiếp tục xem
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
