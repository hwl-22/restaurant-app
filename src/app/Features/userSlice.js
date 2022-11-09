import { createSlice } from '@reduxjs/toolkit';

import { fetchUser } from '../../utils/FetchLocalStorageData';

const userInfo = fetchUser();

const initialState = {
  user: userInfo,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
