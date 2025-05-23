import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './slices/burgerSlice';
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    auth: authReducer,
    orders: ordersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
