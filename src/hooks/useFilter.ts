import { useState, useMemo } from 'react';
import type { WineItem, WineFilter, WineCategory } from '../types/wine';

export const useFilter = (wines: WineItem[]) => {
  const [filter, setFilter] = useState<WineFilter>({
    category: 'all',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 10000000,
    sortBy: 'featured',
  });

  const setCategory = (category: WineCategory | 'all') => {
    setFilter((prev) => ({ ...prev, category }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilter((prev) => ({ ...prev, searchQuery }));
  };

  const setPriceRange = (minPrice: number, maxPrice: number) => {
    setFilter((prev) => ({ ...prev, minPrice, maxPrice }));
  };

  const setSortBy = (sortBy: WineFilter['sortBy']) => {
    setFilter((prev) => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    setFilter({
      category: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 10000000,
      sortBy: 'featured',
    });
  };

  const filteredWines = useMemo(() => {
    return wines
      .filter((wine) => {
        // Filter by category
        if (filter.category !== 'all' && wine.category !== filter.category) {
          return false;
        }

        // Filter by search query
        if (filter.searchQuery.trim() !== '') {
          const query = filter.searchQuery.toLowerCase();
          const matchName = wine.name.toLowerCase().includes(query);
          const matchSubtitle = wine.subtitle.toLowerCase().includes(query);
          const matchCategory = wine.categoryName.toLowerCase().includes(query);
          const matchOrigin = wine.origin.toLowerCase().includes(query);
          if (!matchName && !matchSubtitle && !matchCategory && !matchOrigin) {
            return false;
          }
        }

        // Filter by price range
        if (wine.price < filter.minPrice || wine.price > filter.maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'price-asc') return a.price - b.price;
        if (filter.sortBy === 'price-desc') return b.price - a.price;
        if (filter.sortBy === 'rating') return b.rating - a.rating;
        // default featured (keep order or puts isHot/isNew first)
        const scoreA = (a.isHot ? 2 : 0) + (a.isNew ? 1 : 0);
        const scoreB = (b.isHot ? 2 : 0) + (b.isNew ? 1 : 0);
        return scoreB - scoreA;
      });
  }, [wines, filter]);

  return {
    filter,
    setFilter,
    setCategory,
    setSearchQuery,
    setPriceRange,
    setSortBy,
    resetFilters,
    filteredWines,
  };
};
