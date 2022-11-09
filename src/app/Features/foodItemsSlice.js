import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foodItems: null,
};

const foodItemsSlice = createSlice({
  name: 'foodItems',
  initialState,
  reducers: {
    setFoodItems: (state, action) => {
      state.foodItems = action.payload;
    },
  },
});

export const { setFoodItems } = foodItemsSlice.actions;

export default foodItemsSlice.reducer;
