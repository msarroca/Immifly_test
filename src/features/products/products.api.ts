import { api } from '@features/lib/api';
import { Product } from '@models/index';

export async function fetchProductsAPI(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products');
  return data;
}
