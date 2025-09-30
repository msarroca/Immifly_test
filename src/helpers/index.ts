import type { Product } from '@features/products/products.slice';

export type CartItem = { product: Product; quantity: number };

export const calculateTotalEUR = (items: CartItem[]): number => {
  return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
};
