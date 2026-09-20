import React from "react";
import type { CartItem as CartItemType } from "../../types/cart";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCart } from "../../hooks/useCart";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div
      className="flex gap-4 border-b border-[#2e2629] items-center"
      style={{
        padding: "16px 0",
      }}
    >
      {/* Product Thumb */}
      <img
        src={product.image}
        alt={product.name}
        className="w-17.5 h-21 object-cover rounded-lg border border-[#332b2e] bg-[#0d0b0c]"
      />

      {/* Info */}
      <div className="flex-1">
        <h4
          className="text-[0.95rem] text-[#f5e6ab] mb-1 leading-[1.3]"
          style={{
            marginBottom: "4px",
          }}
        >
          {product.name}
        </h4>
        <p
          className="text-[0.75rem] text-[#d4af37] mb-2"
          style={{ marginBottom: "8px" }}
        >
          {formatCurrency(product.price)}
        </p>

        {/* Quantity control */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center bg-[#0d0b0c] border border-[#332b2e] rounded-md text-[0.8rem]">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              style={{ padding: "4px 10px", color: "#d4af37" }}
            >
              -
            </button>
            <span
              style={{ padding: "0 8px", color: "#f5f3f0", fontWeight: "bold" }}
            >
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              style={{ padding: "4px 10px", color: "#d4af37" }}
            >
              +
            </button>
          </div>

          <button
            className="text-[#e74c3c] text-[0.8rem] opacity-[0.8]"
            onClick={() => removeFromCart(product.id)}
          >
            Xóa
          </button>
        </div>
      </div>

      {/* Total for item */}
      <div className="text-right font-bold text-[#fbb450] text-[0.95rem]">
        {formatCurrency(product.price * quantity)}
      </div>
    </div>
  );
};
