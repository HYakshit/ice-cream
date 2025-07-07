import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    isLiked: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === itemId);

      if (existingItem) {
        existingItem.isLiked = !existingItem.isLiked;
      } else {
        state.cartItems.push({ id: itemId, isLiked: true });
      }
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    increase: (state, action) => {
      const itemdD = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === itemdD);
      if (existingItem) {
        existingItem.quantity += 1;
        console.log(existingItem);
      }
    },
    decrease: (state, action) => {
      const itemdD = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === itemdD);
      if (existingItem) {
        existingItem.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { decrease, increase, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
