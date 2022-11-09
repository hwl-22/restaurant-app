import { configureStore } from '@reduxjs/toolkit';

import userReducer from './Features/userSlice';
import cartReducer from './Features/cartSlice';
import sidebarReducer from './Features/sidebarSlice';
import foodItemsReducer from './Features/foodItemsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    sidebar: sidebarReducer,
    foodItems: foodItemsReducer,
  },
});

export default store;
