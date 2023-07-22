/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, type FC } from "react";
import "./assets/styles/scss/style.scss";
import { AppRoutes, UnAuthenticatedRoutes } from "./routes";
import { useAppDispatch } from "./config/store";
import { getCsrfToken } from "./pages/auth/ducks/opertators";
import { useSelector } from "react-redux";
import { IRootState } from "./config/reducers";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticatedUser, fetched } = useSelector(
    (state: IRootState) => state.authReducer
  );
  useEffect(() => {
    dispatch(getCsrfToken());
  }, [dispatch]);

  return (
    <>
      {!fetched && <span>Loading...</span>}
      {fetched && isAuthenticatedUser && <AppRoutes />}
      {fetched && !isAuthenticatedUser && <UnAuthenticatedRoutes />}
    </>
  );
};

export default App;
