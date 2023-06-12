/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NestedErrorValue {
  message: string;
  field: string;
  value: string;
}

export interface NestedErrorMessage {
  message: string;
  type: string;
  status: string;
  code: string | number;
  errors: NestedErrorValue[];
}

export interface ErrorMessage {
  message: string;
  code: number;
  type: string;
  field?: string;
  params?: string[];
}

export interface ErrorState {
  errors: ErrorMessage[];
  notFoundPath: string;
}

export const initialState: ErrorState = {
  errors: [],
  notFoundPath: "",
};

const ErrorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<any>) {
      state.errors = action.payload || [];
    },
  },
});

export const ErrorAction = ErrorSlice.actions;
export default ErrorSlice.reducer;
