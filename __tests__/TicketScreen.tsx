import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../src/features/products/products.slice';
import cartReducer from '../src/features/cart/cart.slice';
import salesReducer from '../src/features/sales/sales.slice';
import TicketScreen from '../src/screens/TicketScreen';
import type { RootState } from '../src/app/store';

const renderWithStore = (preloadedState: Partial<RootState>) => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
      sales: salesReducer,
    },
    preloadedState: preloadedState as RootState,
  });

  return render(
    <Provider store={store}>
      <TicketScreen />
    </Provider>,
  );
};

describe('TicketScreen', () => {
  it('show ticktScreen with a product', () => {
    renderWithStore({
      products: { items: [], status: 'succeeded', error: null },
      cart: {
        items: [
          {
            id: 1,
            product: {
              id: 1,
              title: 'Mens Cotton Jacket',
              price: 60.47,
              image: 'http://img.png',
            },
            quantity: 1,
          },
        ],
      },
      sales: { currency: 'USD', saleType: 'RETAIL', status: 'idle', error: null },
    });

    expect(screen.getByText('Ticket')).toBeTruthy();

    expect(screen.getByTestId('product')).toBeTruthy();

    expect(screen.getByText('A')).toBeTruthy();

    expect(screen.getByText('1')).toBeTruthy();

    expect(screen.getByTestId('total')).toBeTruthy();

    expect(screen.getByText('Efectivo')).toBeTruthy();

    expect(screen.getByText('Tarjeta')).toBeTruthy();
  });
});
