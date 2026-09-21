import React from 'react';
import type { WineFilter } from '../../types/wine';
import { LuRotateCcw } from 'react-icons/lu';
import { FaSearch } from 'react-icons/fa';

interface ProductFilterProps {
  filter: WineFilter;
  onSearchChange: (search: string) => void;
  onSortChange: (sortBy: WineFilter['sortBy']) => void;
  onReset: () => void;
  totalCount: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filter,
  onSearchChange,
  onSortChange,
  onReset,
  totalCount,
}) => {
  return (
    <div
      className="product-filter-container"
      style={{
        backgroundColor: '#171315',
        border: '1px solid #332b2e',
        borderRadius: '16px',
        padding: '20px',
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
        }}
      >
        {/* Search Bar */}
        <div className="product-filter-search" style={{ position: 'relative', flex: '1 1 300px', maxWidth: '450px' }}>
          <FaSearch
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#a39c97',
              fontSize: '0.85rem',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm Prosecco, Gift Set Tết, vang đỏ..."
            style={{
              width: '100%',
              backgroundColor: '#0d0b0c',
              border: '1px solid #332b2e',
              borderRadius: '25px',
              padding: '10px 38px 10px 42px',
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
        <div className="product-filter-sort" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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

          {(filter.searchQuery || filter.sortBy !== 'featured') && (
            <button
              onClick={onReset}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.8rem] font-medium text-red-400 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all duration-200 cursor-pointer"
            >
              <LuRotateCcw className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-180" />
              <span>Đặt lại</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
