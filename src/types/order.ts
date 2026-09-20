import type { CartItem } from './cart';

export type PaymentMethod = 'cod' | 'bank_transfer' | 'vnpay';

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  note?: string;
  paymentMethod: PaymentMethod;
  isAgeConfirmed: boolean;
}

export interface OrderInfo {
  orderId: string;
  items: CartItem[];
  formData: CheckoutFormData;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  createdAt: string;
}
