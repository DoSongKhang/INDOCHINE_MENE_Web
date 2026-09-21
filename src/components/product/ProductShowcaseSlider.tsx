import React, { useState, useEffect, useRef } from "react";
import type { WineItem } from "../../types/wine";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../common/Button";
import { useCart } from "../../hooks/useCart";

interface ProductShowcaseSliderProps {
  products: WineItem[];
  onQuickView?: (product: WineItem) => void;
}

export const ProductShowcaseSlider: React.FC<ProductShowcaseSliderProps> = ({
  products,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const { addToCart } = useCart();

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll active thumbnail into view smoothly
  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  // Keep currentIndex valid when product list changes (e.g. filter)
  useEffect(() => {
    if (currentIndex >= products.length) {
      setCurrentIndex(Math.max(0, products.length - 1));
    }
  }, [products.length, currentIndex]);

  const goToNext = () => {
    if (products.length === 0) return;
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setAnimKey((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (products.length === 0) return;
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setAnimKey((prev) => prev + 1);
  };

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setAnimKey((prev) => prev + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [products.length]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      goToNext();
    } else if (distance < -50) {
      goToPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleAddToCart = (product: WineItem) => {
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 24px",
          backgroundColor: "#121212",
          borderRadius: "16px",
          border: "1px solid #262626",
        }}
      >
        <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>🍷</div>
        <h3
          style={{ color: "#ffffff", fontSize: "1.4rem", marginBottom: "8px" }}
        >
          Không Tìm Thấy Sản Phẩm Phù Hợp
        </h3>
        <p style={{ color: "#9e9e9e", fontSize: "0.95rem" }}>
          Vui lòng thử tìm kiếm lại với từ khóa khác hoặc điều chỉnh bộ lọc.
        </p>
      </div>
    );
  }

  const currentProduct = products[currentIndex] || products[0];

  return (
    <div
      key={`container-${animKey}`}
      className="showcase-container-pulse"
      style={{
        position: "relative",
        backgroundColor: "#0a0a0a",
        border: "1px solid #262626",
        borderRadius: "20px",
        padding: "18px 24px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background glow spotlight */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "10%",
          width: "450px",
          height: "450px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />



      {/* Presentation Stage Wrapper with Dedicated Fixed Navigation Arrows */}
      <div
        style={{
          position: "relative",
          padding: "0 40px",
          marginBottom: "16px",
          height: "385px",
        }}
      >
        {/* Side Navigation Arrow: Previous (Cố định ở tâm khung trình chiếu) */}
        <button
          onClick={goToPrev}
          aria-label="Sản phẩm trước"
          title="Sản phẩm trước (Phím ←)"
          style={{
            position: "absolute",
            left: "0px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 30,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            color: "rgba(255, 255, 255, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.22)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.45)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Side Navigation Arrow: Next (Cố định ở tâm khung trình chiếu) */}
        <button
          onClick={goToNext}
          aria-label="Sản phẩm tiếp theo"
          title="Sản phẩm tiếp theo (Phím →)"
          style={{
            position: "absolute",
            right: "0px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 30,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            color: "rgba(255, 255, 255, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.22)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.45)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Main Slide Presentation Stage (Cố định chiều cao tuyệt đối 100% = 460px) */}
        <div
          key={animKey}
          className={direction === "next" ? "showcase-transition-next" : "showcase-transition-prev"}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: "32px",
            height: "100%",
            alignItems: "stretch",
          }}
        >
          {/* Left Column: Hero Showcase Box (Đồng nhất 100% chiều cao và tỷ lệ cho mọi ảnh) */}
          <div
            style={{
              position: "relative",
              backgroundColor: "#121212",
              borderRadius: "16px",
              border: "1px solid #262626",
              height: "100%",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Badges Top Left */}

            {/* Product Image - Luôn lấp đầy khung ảnh đồng đều 100% */}
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="showcase-image-anim"
              style={{
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "brightness(0.92)",
                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />

            {/* Subtle Vignette Gradient Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10, 10, 10, 0.6) 0%, transparent 45%, rgba(10, 10, 10, 0.3) 100%)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          </div>

          {/* Right Column: Sommelier Story, Specs & Order */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              padding: "4px 0",
            }}
          >
            {/* Top Details Group */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {/* Category & Origin Line */}
              <div
                className="showcase-detail-stagger-1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#1f1f1f",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                  }}
                >
                  {currentProduct.categoryName}
                </span>
                <span style={{ color: "#777777", fontSize: "0.7rem" }}>•</span>
                <span style={{ color: "#bbbbbb", fontSize: "0.76rem" }}>
                  {currentProduct.origin}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="showcase-detail-stagger-2">
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.45rem",
                    lineHeight: 1.18,
                    color: "#ffffff",
                    marginBottom: "2px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {currentProduct.name}
                </h2>
                <p
                  style={{
                    color: "#9e9e9e",
                    fontSize: "0.8rem",
                    fontStyle: "italic",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {currentProduct.subtitle}
                </p>
              </div>

              {/* Rating */}
              <div
                className="showcase-detail-stagger-3"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "0.78rem",
                    letterSpacing: "1.2px",
                  }}
                >
                  {"★".repeat(Math.floor(currentProduct.rating))}
                </div>
                <span
                  style={{
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                  }}
                >
                  {currentProduct.rating.toFixed(1)}
                </span>
                <span style={{ color: "#777777", fontSize: "0.72rem" }}>
                  ({currentProduct.reviewCount} đánh giá)
                </span>
              </div>

              {/* Description (giới hạn 2 dòng để không làm nhảy bố cục) */}
              <p
                className="showcase-detail-stagger-3"
                style={{
                  color: "#cccccc",
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                  borderLeft: "2px solid #ffffff",
                  paddingLeft: "8px",
                  display: "-webkit-box",

                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {currentProduct.description}
              </p>
            </div>

            {/* Middle Group: Specs & Tasting Notes */}
            <div
              className="showcase-detail-stagger-4"
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {/* Technical Specs Pill Badges (4 cột đồng nhất) */}
              <div

              >
                <div>

                  <div
                    style={{
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      marginTop: "1px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {currentProduct.abv}
                  </div>
                </div>
                <div>

                  <div
                    style={{
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      marginTop: "1px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {currentProduct.volume}
                  </div>
                </div>
                <div>

                  <div
                    style={{
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      marginTop: "1px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {currentProduct.grape}
                  </div>
                </div>
                <div>

                  <div
                    style={{
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      marginTop: "1px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {currentProduct.tastingNotes?.servingTemp || ""}
                  </div>
                </div>
              </div>


            </div>

            {/* Bottom Group: Pricing Box & Action Buttons */}
            <div
              className="showcase-detail-stagger-5"
              style={{
                paddingTop: "8px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {/* Price Line */}
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "10px" }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {formatCurrency(currentProduct.price)}
                </span>
                {currentProduct.originalPrice && (
                  <span
                    style={{
                      color: "#666666",
                      fontSize: "0.85rem",
                      textDecoration: "line-through",
                    }}
                  >
                    {formatCurrency(currentProduct.originalPrice)}
                  </span>
                )}
                {currentProduct.inStock ? (
                  <span
                    style={{
                      color: "#4ade80",
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      marginLeft: "auto",
                    }}
                  >
                    ✓ Còn hàng sẵn tại hầm
                  </span>
                ) : (
                  <span
                    style={{
                      color: "#ef4444",
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      marginLeft: "auto",
                    }}
                  >
                    Tạm hết hàng
                  </span>
                )}
              </div>

              {/* Buttons Row */}
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => handleAddToCart(currentProduct)}
                  disabled={!currentProduct.inStock}
                  className="w-full flex items-center justify-center gap-2 !py-[9px] !px-4 text-[0.84rem] tracking-[1px] border border-[#333] rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 hover:!bg-red-800"
                  style={{
                    padding: "9px 16px",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {isAdded ? "✓ ĐÃ THÊM VÀO GIỎ HÀNG!" : "THÊM VÀO GIỎ HÀNG"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mini Thumbnails Carousel Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "12px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontSize: "0.74rem",
              color: "#888888",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            CHỌN NHANH KIỆT TÁC TRONG BỘ SƯU TẬP:
          </span>
          <span style={{ fontSize: "0.72rem", color: "#555555" }}>
            Dùng chuột click hoặc phím mũi tên ← →
          </span>
        </div>

        {/* Scrollable Thumbnails Container */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "6px",
            scrollbarWidth: "thin",
          }}
        >
          {products.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                ref={isActive ? activeThumbnailRef : null}
                onClick={() => goToIndex(idx)}
                style={{
                  flex: "0 0 145px",
                  backgroundColor: isActive ? "#1e1e1e" : "#121212",
                  border: isActive ? "2px solid #ffffff" : "1px solid #262626",
                  borderRadius: "10px",
                  padding: "7px 9px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  boxShadow: isActive
                    ? "0 4px 16px rgba(255, 255, 255, 0.2)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = "#262626";
                }}
              >
                {/* Mini Image */}
                <div
                  style={{
                    width: "30px",
                    height: "42px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0a0a0a",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Mini Info */}
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      color: isActive ? "#ffffff" : "#aaaaaa",
                      fontSize: "0.74rem",
                      fontWeight: isActive ? 700 : 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      color: isActive ? "#ffffff" : "#666666",
                      fontSize: "0.7rem",
                      marginTop: "1px",
                      fontWeight: 600,
                    }}
                  >
                    {formatCurrency(item.price)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
