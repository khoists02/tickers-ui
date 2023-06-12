/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { ErrorAction } from "../reducers/errorSlice";

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
      return await Promise.reject();
    }
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
