import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Currency, SaleType, CartItem } from 'models/index';

export const processPayment = createAsyncThunk<
  { message: string },
  {
    items: CartItem[];
    total: number;
    currency: Currency;
    saleType: SaleType;
    seatRow: string;
    seatNumber: string;
  }
>('sales/processPayment', async () => {
  const res = await new Promise<{ status: number; message: string }>((resolve) =>
    setTimeout(() => resolve({ status: 200, message: 'Pago procesado con éxito' }), 1000),
  );
  if (res.status !== 200) throw new Error('Error en el pago');
  return { message: res.message };
});
