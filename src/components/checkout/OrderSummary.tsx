import React, { useState } from "react";
import type { CartItem } from "../../types/cart";
import { formatCurrency } from "../../utils/formatCurrency";

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  subtotal,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState("");

  const shippingFee = subtotal > 2000000 ? 0 : 50000;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "KHOINIEN2026") {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setPromoSuccess("Áp dụng mã KHOINIEN2026 thành công! Giảm 10%");
    } else if (promoCode.trim().toUpperCase() === "TETVIP") {
      setDiscountAmount(200000);
      setPromoSuccess("Áp dụng mã TETVIP thành công! Giảm 200.000đ");
    } else {
      alert("Mã giảm giá không hợp lệ. Gợi ý thử mã: KHOINIEN2026 hoặc TETVIP");
    }
  };

  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  return (
    <div
      className="bg-[#171315] border border-[#332b2e] rounded-2xl p-6 sticky top-25"
      style={{
        padding: "24px",
      }}
    >
      <h3
        className="text-[1.2rem] text-[#d4af37] mb-5 flex items-center gap-2.5"
        style={{
          marginBottom: "20px",
        }}
      >
        <span>🛍️</span> ĐƠN HÀNG CỦA BẠN (
        {cart.reduce((s, i) => s + i.quantity, 0)})
      </h3>

      {/* Cart Items List */}
      <div
        className="max-h-75 overflow-y-auto mb-5 pr-1.5"
        style={{
          marginBottom: "20px",
          paddingRight: "6px",
        }}
      >
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between gap-3 py-2.5 border-b border-[#2e2629] text-[0.85rem]"
            style={{
              padding: "10px 0",
            }}
          >
            <div className="flex items-center gap-2.5">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-11.25 h-13.75 object-cover rounded-md"
              />
              <div>
                <div className="text-[#f5e6ab] font-semibold text-[0.85rem]">
                  {item.product.name}
                </div>
                <div className="text-[#6e6b68]">Số lượng: {item.quantity}</div>
              </div>
            </div>
            <div className="text-[#fbb450] font-bold">
              {formatCurrency(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Box */}
      <div style={{ marginBottom: "20px" }}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Mã ưu đãi (VD: KHOINIEN2026)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 bg-[#0d0b0c] border border-[#332b2e] rounded-md py-2 px-3 text-[#f5f3f0] text-[0.85rem] outline-none uppercase"
            style={{
              padding: "8px 12px",
            }}
          />
          <button
            type="button"
            onClick={handleApplyPromo}
            className="bg-[#4a151b] text-[#f5e6ab] border border-[#d4af37] rounded-md py-2 px-4 text-[0.8rem] font-bold"
            style={{
              padding: "8px 16px",
            }}
          >
            ÁP DỤNG
          </button>
        </div>
        {promoSuccess && (
          <p
            className="text-[#2ecc71] text-[0.75rem] mt-1.5"
            style={{ marginTop: "6px" }}
          >
            ✓ {promoSuccess}
          </p>
        )}
      </div>

      {/* Financial Summary Calculation */}
      <div
        className="flex flex-col gap-2.5 text-[0.9rem] border-t border-[#2e2629] pt-4"
        style={{
          paddingTop: "16px",
        }}
      >
        <div className="flex justify-between text-[#a39c97]">
          <span>Tạm tính:</span>
          <span className="text-[#f5f3f0]">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-[#a39c97]">
          <span>Phí vận chuyển bảo quản hỏa tốc:</span>
          <span>
            {shippingFee === 0 ? (
              <strong className="text-[#2ecc71]">
                Miễn phí (Đơn &gt;2 triệu)
              </strong>
            ) : (
              formatCurrency(shippingFee)
            )}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-[#2ecc71]">
            <span>Ưu đãi giảm giá VIP:</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div
          className="flex justify-between items-baseline border-t border-[#332b2e] pt-4 mt-2"
          style={{
            paddingTop: "16px",
            marginTop: "8px",
          }}
        >
          <span className="text-[1.1rem] font-semibold text-[#f5f3f0]">
            TỔNG CỘNG:
          </span>
          <span className="text-[1.6rem] font-bold text-[#fbb450]">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};
