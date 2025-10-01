import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import productsReducer from '@features/products/products.slice';
import cartReducer from '@features/cart/cart.slice';
import salesReducer from '@features/sales/sales.slice';

let Reactotron: any = null;
// @ts-ignore
if (__DEV__ && process.env.JEST_WORKER_ID === undefined) {
  Reactotron = require('../../ReactotronConfig').default;
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    sales: salesReducer,
  },
  enhancers: (getDefaultEnhancers) =>
    __DEV__ && Reactotron
      ? getDefaultEnhancers().concat(Reactotron.createEnhancer!())
      : getDefaultEnhancers(),
  devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
