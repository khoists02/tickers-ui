import React from "react";
import { IAuthRoute } from "../pages/tickers";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ element }: IAuthRoute): React.ReactElement => {
  return element != null ? element : <Navigate to="/PageNotFound" />;
};
