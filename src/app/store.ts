import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import productsReducer from '@features/products/products.slice';
import cartReducer from '@features/cart/cart.slice';
import currencyReducer from '@features/currency/currency.slice';
import Reactotron from '../../ReactotronConfig';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    currency: currencyReducer,
  },
  enhancers: (getDefaultEnhancers) =>
    __DEV__ ? getDefaultEnhancers().concat(Reactotron.createEnhancer!()) : getDefaultEnhancers(),
  devTools: __DEV__,
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
