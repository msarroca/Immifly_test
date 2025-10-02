import { CURRENCIES, SALE_TYPES } from '@constants/sales';
export type RootStackParamList = {
  Products: undefined;
  Ticket: undefined;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type CartItem = { product: Product; quantity: number };

export type CartState = { items: CartItem[] };

export type ProductsState = {
  items: Product[];
  status: 'initial' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

export type SalesState = {
  currency: Currency;
  saleType: SaleType;
  status: 'initial' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  lastMessage?: string;
};

export type Currency = (typeof CURRENCIES)[number]['key'];
export type SaleType = (typeof SALE_TYPES)[number]['key'];

export type PaymentError = {
  message: string;
};

export type Item = { key: string; label: string };

export type PickerModalProps = {
  visible: boolean;
  title: string;
  items: readonly Item[];
  selectedKey: string;
  onSelect: (key: string) => void;
  onClose: () => void;
};

export type ProductQuantityModalProps = {
  visible: boolean;
  onClose: () => void;
  product: any | null;
  quantity: number;
  currency: Currency;
};
