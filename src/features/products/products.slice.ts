import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@models/index';
import { fetchProducts } from './thunks';
import { STATUS } from '@constants/status';
import { ProductsState } from '@models/index';

const { initial, loading, succeded, failed } = STATUS;

const initialState: ProductsState = { items: [], status: initial };

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (state) => {
      state.status = loading;
      state.error = undefined;
    });
    b.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.status = succeded;
      state.items = action.payload;
    });
    b.addCase(fetchProducts.rejected, (state, action) => {
      state.status = failed;
      state.error = action.error.message || 'Error fetching products';
    });
  },
});

export default productsSlice.reducer;
export type { Product };
