import { createSlice } from '@reduxjs/toolkit';

import { fetchCart } from '../../utils/FetchLocalStorageData';

const cartInfo = fetchCart();

const initialState = {
  cartItems: cartInfo,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQty: (state, action) => {
      state.cartItems[action.payload].quantity++;
    },
    decreaseQty: (state, action) => {
      state.cartItems[action.payload].quantity--;
    },
    removeItem: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { increaseQty, decreaseQty, removeItem, setCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
