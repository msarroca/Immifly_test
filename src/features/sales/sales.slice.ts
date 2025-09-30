// src/features/sales/sales.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CURRENCIES, SALE_TYPES } from '@constants/sales';

export type Currency = (typeof CURRENCIES)[number]['key'];
export type SaleType = (typeof SALE_TYPES)[number]['key'];

const RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
};

type SalesState = {
  currency: Currency;
  saleType: SaleType;
};

const initialState: SalesState = {
  currency: 'EUR',
  saleType: 'RETAIL',
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
    setSaleType(state, action: PayloadAction<SaleType>) {
      state.saleType = action.payload;
    },
  },
});

export const { setCurrency, setSaleType } = salesSlice.actions;

export const convert = (valueEUR: number, currency: Currency) =>
  new Intl.NumberFormat('en', { style: 'currency', currency }).format(valueEUR * RATES[currency]);

export default salesSlice.reducer;
