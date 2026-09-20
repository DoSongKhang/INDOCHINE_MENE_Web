import React from 'react';
import { CATEGORIES } from '../../constants/categories';
import type { WineCategory, WineFilter } from '../../types/wine';

interface ProductFilterProps {
  filter: WineFilter;
  onCategoryChange: (category: WineCategory | 'all') => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sortBy: WineFilter['sortBy']) => void;
  onReset: () => void;
  totalCount: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filter,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onReset,
  totalCount,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#171315',
        border: '1px solid #332b2e',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '450px' }}>
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Tìm kiếm Prosecco, Gift Set Tết, vang đỏ..."
            style={{
              width: '100%',
              backgroundColor: '#0d0b0c',
              border: '1px solid #332b2e',
              borderRadius: '25px',
              padding: '10px 20px',
              color: '#f5f3f0',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          {filter.searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a39c97',
                fontSize: '0.8rem',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.85rem', color: '#a39c97' }}>
            Hiển thị <strong>{totalCount}</strong> sản phẩm
          </span>
          <select
            value={filter.sortBy}
            onChange={(e) => onSortChange(e.target.value as WineFilter['sortBy'])}
            style={{
              backgroundColor: '#0d0b0c',
              border: '1px solid #332b2e',
              borderRadius: '8px',
              color: '#d4af37',
              padding: '8px 14px',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="featured">Nổi Bật Nhất</option>
            <option value="price-asc">Giá: Thấp Đến Cao</option>
            <option value="price-desc">Giá: Cao Đến Thấp</option>
            <option value="rating">Đánh Giá Cao Nhất</option>
          </select>

          {(filter.category !== 'all' || filter.searchQuery || filter.sortBy !== 'featured') && (
            <button
              onClick={onReset}
              style={{ color: '#e74c3c', fontSize: '0.8rem', textDecoration: 'underline' }}
            >
              Đặt lại lọc
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {CATEGORIES.map((cat) => {
          const isSelected = filter.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? '#0d0b0c' : '#f5f3f0',
                background: isSelected
                  ? 'linear-gradient(135deg, #f5e6ab, #d4af37)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: isSelected ? 'none' : '1px solid #332b2e',
                transition: 'all 0.25s ease',
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
