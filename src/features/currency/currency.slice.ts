import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Currency = 'EUR' | 'USD' | 'GBP';

const RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
};

type CurrencyState = {
  selected: Currency;
};

const initialState: CurrencyState = { selected: 'EUR' };

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.selected = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export const convert = (valueEUR: number, currency: Currency) =>
  new Intl.NumberFormat('en', { style: 'currency', currency }).format(valueEUR * RATES[currency]);
export default currencySlice.reducer;
