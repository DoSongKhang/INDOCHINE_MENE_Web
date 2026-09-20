export type WineCategory = 'prosecco' | 'sparkling' | 'rose' | 'red' | 'giftset';

export interface TastingNotes {
  aroma: string[];
  taste: string[];
  pairing: string[];
  servingTemp: string;
}

export interface WineItem {
  id: string;
  name: string;
  subtitle: string;
  category: WineCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  abv: string; // e.g. "11% Vol"
  volume: string; // e.g. "750ml"
  origin: string; // e.g. "DOCG Veneto, Ý"
  grape: string; // e.g. "Glera 100%"
  description: string;
  tastingNotes: TastingNotes;
  isNew?: boolean;
  isHot?: boolean;
  isLimited?: boolean;
  inStock: boolean;
}

export interface WineFilter {
  category: WineCategory | 'all';
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}
