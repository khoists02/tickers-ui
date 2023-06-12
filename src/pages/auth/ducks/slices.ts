import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token: "",
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    getCsrfStart(state) {
      state.loading = true;
    },
    getCsrfSuccess(
      state,
      action,
    ) {
      state.loading = false;
      state.token = action.payload;
    },
    getCsrfFail(state) {
      state.loading = false;
      state.token = "";
    },
  },
});

export const AuthAction = authSlice.actions;
export default authSlice.reducer;
