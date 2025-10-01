import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI } from './products.api';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  return await fetchProductsAPI();
});
