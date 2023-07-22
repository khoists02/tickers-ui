/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { AppThunk } from "../../../config/store";
import { AuthAction } from "./slices";

export const getCsrfToken =
  (): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(AuthAction.getCsrfStart());

        const data = await axios.post("/csrf");
        dispatch(
          AuthAction.getCsrfSuccess(
            data.data.token
          )
        );
      } catch (err) {
        dispatch(AuthAction.getCsrfFail());
      } finally {
        dispatch(getAuthenticatedUser());
      }
    };

export const submitLogin = (username: string, password: string): AppThunk =>
  async (dispatch) => {
    const requestBody = { username, password }
    try {
      dispatch(AuthAction.loginStart());
      await axios.post("/auth/authenticate", requestBody);
      dispatch(AuthAction.loginSuccess());
      window.location.href = "/";
    } catch (err) {
      // @ts-ignore
      dispatch(AuthAction.loginFail(err?.response?.data));
    }
  };

export const getAuthenticatedUser =
    (): AppThunk =>
      async (dispatch) => {
        try {
          dispatch(AuthAction.getAuthenticatedUserStart());

          const response = await axios.get("/authenticatedUser");
          dispatch(
            AuthAction.getAuthenticatedUserSuccess(
              response.data
            )
          );
        } catch (err) {
          // @ts-ignore
          dispatch(AuthAction.getAuthenticatedUserFail(err?.response?.data));
        }
      };

export const logout =
    (): AppThunk =>
      async (dispatch) => {
        try {
          await axios.post("/auth/logout");
          window.location.href = "/";
        } catch (err) {
          // @ts-ignore
          dispatch(AuthAction.getAuthenticatedUserFail(err?.response?.data));
        }
      };
