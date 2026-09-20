import React from 'react';
import type { CartItem as CartItemType } from '../../types/cart';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        padding: '16px 0',
        borderBottom: '1px solid #2e2629',
        alignItems: 'center',
      }}
    >
      {/* Product Thumb */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '70px',
          height: '84px',
          objectFit: 'cover',
          borderRadius: '8px',
          border: '1px solid #332b2e',
          backgroundColor: '#0d0b0c',
        }}
      />

      {/* Info */}
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '0.95rem', color: '#f5e6ab', marginBottom: '4px', lineHeight: 1.3 }}>
          {product.name}
        </h4>
        <p style={{ fontSize: '0.75rem', color: '#d4af37', marginBottom: '8px' }}>
          {formatCurrency(product.price)}
        </p>

        {/* Quantity control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#0d0b0c',
              border: '1px solid #332b2e',
              borderRadius: '6px',
              fontSize: '0.8rem',
            }}
          >
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              style={{ padding: '4px 10px', color: '#d4af37' }}
            >
              -
            </button>
            <span style={{ padding: '0 8px', color: '#f5f3f0', fontWeight: 'bold' }}>{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              style={{ padding: '4px 10px', color: '#d4af37' }}
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(product.id)}
            style={{ color: '#e74c3c', fontSize: '0.8rem', opacity: 0.8 }}
          >
            Xóa
          </button>
        </div>
      </div>

      {/* Total for item */}
      <div style={{ textAlign: 'right', fontWeight: 'bold', color: '#fbb450', fontSize: '0.95rem' }}>
        {formatCurrency(product.price * quantity)}
      </div>
    </div>
  );
};
