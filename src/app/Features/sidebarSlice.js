import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSideBar: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarOpen: (state) => {
      state.isSideBar = true;
    },

    setSidebarClose: (state) => {
      state.isSideBar = false;
    },
  },
});

export const { setSidebarOpen, setSidebarClose } = sidebarSlice.actions;
export default sidebarSlice.reducer;
