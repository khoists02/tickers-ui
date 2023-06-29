/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, type FC } from "react";
import "./assets/styles/scss/style.scss";
import { AppRoutes } from "./routes";
import { useAppDispatch } from "./config/store";
import { getCsrfToken } from "./pages/auth/ducks/opertators";
import { useSelector } from "react-redux";
import { IRootState } from "./config/reducers";
import { getTickerDetails } from "./pages/tickers/ducks/operators";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useSelector((state: IRootState) => state.authReducer);
  useEffect(() => {
    dispatch(getCsrfToken());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getTickerDetails("cc289b3b-cad5-445d-ab21-7f2ba7b1c005"));
    }
  }, [dispatch, token]);
  return (
    <>
      <AppRoutes />;
    </>
  );
};

export default App;
