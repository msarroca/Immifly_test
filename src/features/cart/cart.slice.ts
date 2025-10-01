import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@features/products/products.slice';
import { CartState } from '@models/index';

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((item) => item.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.product.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.product.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.product.id !== action.payload);
        }
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
