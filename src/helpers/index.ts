import { Currency, CartItem } from '@models/index';
import { RATES } from '@constants/sales';

export const calculateTotalEUR = (items: CartItem[]): number => {
  return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
};

export const convertRates = (valueEUR: number, currency: Currency) =>
  new Intl.NumberFormat('en', { style: 'currency', currency }).format(valueEUR * RATES[currency]);
