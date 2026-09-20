import type { WineItem } from './wine';

export interface CartItem {
  product: WineItem;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: WineItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}
