import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthenticatedUserResponse } from "../../../types/user";
import { ErrorMessage } from "../../../types/generic";

const initialState = {
  loading: false,
  token: "",
  authenticatedUser: null as unknown as AuthenticatedUserResponse,
  errorMessage: null as unknown as ErrorMessage,
  fetched: false as boolean,
  isAuthenticatedUser: false as boolean,
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
    getAuthenticatedUserStart(state) {
      state.loading = true;
    },
    getAuthenticatedUserSuccess(state, action: PayloadAction<AuthenticatedUserResponse>) {
      state.authenticatedUser = action.payload;
      state.fetched = true;
      state.isAuthenticatedUser = true;
      state.loading = false;
    },
    getAuthenticatedUserFail(state, action: PayloadAction<ErrorMessage>) {
      state.errorMessage = action.payload;
      state.fetched = true;
      state.isAuthenticatedUser = false;
      state.loading = false;
    },
    clearAuthentication(state) {
      state.isAuthenticatedUser = false;
    },
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.loading = false;
    },
    loginFail(state, action: PayloadAction<ErrorMessage>) {
      state.errorMessage = action.payload;
      state.loading = false;
    }
  }
});

export const AuthAction = authSlice.actions;
export default authSlice.reducer;
