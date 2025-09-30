import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductsAPI, Product } from './products.api';

type ProductsState = {
  items: Product[];
  status: 'initial' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: ProductsState = { items: [], status: 'initial' };

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  return await fetchProductsAPI();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    });
    b.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    b.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Error fetching products';
    });
  },
});

export default productsSlice.reducer;
export type { Product };
