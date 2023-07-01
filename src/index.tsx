import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import setupAxiosInterceptors from "./config/axios-interceptor";
import store from "./config/store";
import { Provider } from "react-redux";
import { ProgressBar } from "react-bootstrap";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

setupAxiosInterceptors(store);

export const Progress = (): JSX.Element => {
  return (
    <>
      <div className="progress-bar progress-bar-success">
        <span className="sr-only">40% Complete (success)</span>
      </div>
    </>
  );
};

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <React.Suspense
        fallback={
          <ProgressBar animated variant="success" now={100} label={`${100}%`} />
        }
      >
        <Provider store={store}>
          <App />
        </Provider>
      </React.Suspense>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
