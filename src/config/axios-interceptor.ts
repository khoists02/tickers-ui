/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { ErrorAction } from "../reducers/errorSlice";
import { AuthAction } from "../pages/auth/ducks/slices";
import GroupPromise from "./GroupPromise";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}

export interface CustomAxiosError extends AxiosError {
  config: CustomAxiosRequestConfig;
}

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const setupAxiosInterceptors = (store: any): void => {
  const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
    const token = store.getState().authReducer?.token;
    if (token) {
      axios.defaults.headers.common["X-XSRF-TOKEN"] = token;
    }
    return config;
  };
  const onResponseSuccess = (response: AxiosResponse) => response;
  const onResponseError = async (err: CustomAxiosError) => {
    const status = err.response?.status;
    if (status === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const errorMessage = {
        type: "Network Error",
        code: 502,
        message: "Unable to connect to API, please try again.",
      };
      store.dispatch(ErrorAction.setError([errorMessage]));
      return await Promise.reject();
    } else {
      store.dispatch(ErrorAction.setError([err.response?.data]));
      const apiError = err?.response?.data as { code?: string };
      const fetched = store.getState().authReducer?.fetched;
      if (
        apiError?.code === "1000" &&
        fetched &&
        !["/", "/SSO/SAML2", "/Login"].includes(window.location.pathname)
      ) {
        store.dispatch(AuthAction.clearAuthentication());
        window.location.href = "/";
      }

      if (
        ![
          "/ResetPassword",
          "/ForgotPassword",
          "/Auth/EmailValidation",
        ].includes(window?.location?.pathname) &&
        status === 401 &&
        ((!["1003", "1004", "1005", "1013"].includes(apiError?.code || "") &&
          fetched) ||
          apiError?.code === "1007")
      ) {
        const originalRequest = err.config;
        if (!originalRequest?._retry) {
          originalRequest._retry = true;
          const promise = GroupPromise.execute("/auth/refresh");
          if (promise) {
            try {
              await promise;
            } catch (e) {
              store.dispatch(AuthAction.clearAuthentication());
            }
            return await axios.request(originalRequest);
          }
        }
      }
      return await Promise.reject();
    }
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
