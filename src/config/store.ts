/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import thunkMiddleware from "redux-thunk";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import reducer, { IRootState } from "./reducers";
import apiMiddleware from "./apiMiddleware";
import { useDispatch } from "react-redux";

const defaultMiddlewares = [apiMiddleware, thunkMiddleware];
const store = configureStore({
  reducer,
  middleware: defaultMiddlewares,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppThunk = ThunkAction<void, IRootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch | any>();

export default store;
