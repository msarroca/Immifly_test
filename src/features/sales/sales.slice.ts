import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { processPayment } from './thunks';
import { Currency, SalesState, SaleType } from '@models/index';
import { STATUS } from '@constants/status';

const { initial, loading, succeded, failed } = STATUS;

const initialState: SalesState = {
  currency: 'EUR',
  saleType: 'RETAIL',
  status: initial,
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
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.status = loading;
        state.error = undefined;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.status = succeded;
        state.lastMessage = action.payload.message;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = failed;
        state.error = action.error.message;
      });
  },
});

export const { setCurrency, setSaleType } = salesSlice.actions;

export default salesSlice.reducer;
