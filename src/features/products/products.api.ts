import api from '../lib/api';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export async function fetchProductsAPI(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products');
  return data;
}

export async function fetchProductByIdAPI(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}
