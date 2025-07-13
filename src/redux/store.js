import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import ownerReducer from '../features/owner/ownerSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    owner: ownerReducer,
  },
});