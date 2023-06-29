import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  collapsed: false,
};

const SidebarSlice = createSlice({
  name: "sidebarReducer",
  initialState,
  reducers: {
    toggle(state) {
      state.collapsed = !state.collapsed;
    },
  },
});

export const SidebarAction = SidebarSlice.actions;
export default SidebarSlice.reducer;
