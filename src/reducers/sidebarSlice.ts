import { createSlice } from "@reduxjs/toolkit";

const toggle = localStorage.getItem("toggle") || "false";

export const initialState = {
  collapsed: toggle !== "false",
};

const SidebarSlice = createSlice({
  name: "sidebarReducer",
  initialState,
  reducers: {
    toggle(state) {
      state.collapsed = !state.collapsed;
      localStorage.setItem("toggle", state.collapsed ? "true" : "false");
    },
  },
});

export const SidebarAction = SidebarSlice.actions;
export default SidebarSlice.reducer;
