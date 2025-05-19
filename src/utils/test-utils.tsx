import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import burgerReducer, { BurgerState } from '../services/slices/burgerSlice';
import authReducer, { AuthState } from '../services/slices/authSlice';
import ordersReducer, { OrdersState } from '../services/slices/ordersSlice';

// Определяем тип корневого состояния
export interface RootState {
  burger: BurgerState;
  auth: AuthState;
  orders: OrdersState;
}

// Создаем корневой редьюсер
const rootReducer = combineReducers({
  burger: burgerReducer,
  auth: authReducer,
  orders: ordersReducer
});

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

// Setup function to create modal root
export const setupModalRoot = () => {
  // Remove any existing modal root
  cleanupModalRoot();
  
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modals');
  document.body.appendChild(modalRoot);
};

// Cleanup function to remove modal root
export const cleanupModalRoot = () => {
  const modalRoot = document.getElementById('modals');
  if (modalRoot && modalRoot.parentNode) {
    modalRoot.parentNode.removeChild(modalRoot);
  }
};

const customRender = (
  ui: React.ReactElement,
  {
    preloadedState = {} as Partial<RootState>,
    store = configureStore({
      reducer: rootReducer,
      preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { customRender as render }; 