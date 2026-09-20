import React from "react";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../common/Button";

interface CartDrawerProps {
  onCheckoutClick?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckoutClick }) => {
  const { cart, isCartOpen, closeCart, totalPrice, totalItems, clearCart } =
    useCart();

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 bg-black/75 backdrop-blur-[6px] flex justify-end animate-[fadeIn_0.25s_ease]"
      onClick={closeCart}
    >
      <div
        className="w-full max-w-115 h-full bg-[#171315] flex border-l border-[#d4af37] flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.8)] animate-[slideRight_0.3s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          className="px-6 py-5 border-b border-[#332b2e] flex items-center justify-between bg-[#0d0b0c]"
          style={{
            padding: "20px 24px",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-[1.2rem]">🛒</span>
            <h3 className="text-[1.2rem] text-white m-0 font-(--font-serif)">
              GIỎ HÀNG INDOCHINE MÈNE ({totalItems})
            </h3>
          </div>
          <button className="text-[#999999] text-[1.4rem]" onClick={closeCart}>
            ✕
          </button>
        </div>

        {/* Drawer Items List */}
        <div
          className="flex-1 overflow-y-auto px-6"
          // style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}
        >
          {cart.length === 0 ? (
            <div
              className="text-center text-[#999999]"
              style={{
                padding: "60px 20px",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🍾</div>
              <p
                className="text-[1rem] text-white font-(--font-serif)"
                style={{
                  marginBottom: "8px",
                }}
              >
                Giỏ hàng của bạn chưa có sản phẩm
              </p>
              <p style={{ fontSize: "0.85rem" }}>
                Hãy lựa chọn những dòng Prosecco &amp; Gift Set Indochine Mène
                tuyệt hảo nhất.
              </p>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
              <div style={{ padding: "16px 0", textAlign: "right" }}>
                <button
                  className="text-[#ff4d4d] text-[0.8rem] underline"
                  onClick={clearCart}
                >
                  Xóa tất cả sản phẩm
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#222222] bg-[#080808]">
            <div
              className="py-2.5 px-3.5 bg-white/5 border border-white/20 rounded-lg text-[0.8rem] text-white mb-4 flex items-center gap-2"
              style={{
                padding: "10px 14px",
                marginBottom: "16px",
              }}
            >
              <span>🎁</span>
              <span>
                Miễn phí túi quà biếu cao cấp Indochine Mène cho mọi đơn hàng.
              </span>
            </div>

            <div
              className="flex justify-between items-baseline mb-5"
              style={{
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "1rem", color: "#f5f3f0" }}>
                Tổng Tiền Thanh Toán:
              </span>
              <span className="text-[1.5rem] font-bold text-[#fbb450]">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <Button
              variant="gold"
              size="lg"
              fullWidth
              onClick={() => {
                closeCart();
                if (onCheckoutClick) onCheckoutClick();
              }}
            >
              TIẾN HÀNH THANH TOÁN
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
