import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../src/features/products/products.slice';
import cartReducer from '../src/features/cart/cart.slice';
import salesReducer from '../src/features/sales/sales.slice';
import ProductsScreen from '../src/screens/ProductsScreen';
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
      <ProductsScreen />
    </Provider>,
  );
};

describe('ProductsScreen', () => {
  it('show productts', async () => {
    renderWithStore({
      products: {
        items: [
          { id: 1, title: 'Mens Cotton Jacket', price: 15, image: 'http://img.png' },
          { id: 2, title: 'Women Cotton Jacket', price: 30, image: 'http://img2.png' },
        ],
        status: 'succeeded',
        error: null,
      },
      cart: { items: [] },
      sales: { currency: 'EUR', saleType: 'RETAIL', status: 'idle', error: null },
    });

    expect(await screen.findByText('Mens Cotton Jacket')).toBeTruthy();
    expect(screen.getByText('Women Cotton Jacket')).toBeTruthy();
  });

  it('add a product', async () => {
    renderWithStore({
      products: {
        items: [{ id: 1, title: 'Mens Cotton Jacket', price: 15, image: 'http://img.png' }],
        status: 'succeeded',
        error: null,
      },
      cart: { items: [] },
      sales: { currency: 'EUR', saleType: 'RETAIL', status: 'idle', error: null },
    });

    const addButton = await screen.findByText(/Añadir/i);
    fireEvent.press(addButton);

    expect(await screen.findByText('1')).toBeTruthy();

    expect(await screen.getByTestId('delete')).toBeTruthy();

    expect(await screen.getByTestId('total')).toBeTruthy();

    expect(screen.getByText(/EUR/)).toBeTruthy();

    expect(screen.getByText(/Retail/)).toBeTruthy();

    expect(screen.getByTestId('pay-button')).toBeTruthy();
  });
});
