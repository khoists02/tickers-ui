

import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "../../../components/AuthRoute";
import { PageNotFound } from "../../../components/PageNotFound";

const LoginPage = React.lazy(async () => await import("./LoginContainer"));

export interface IAuthRoute {
  element?: React.ReactElement;
  path?: string;
  can?: string[];
  index?: boolean;
}

const routes: IAuthRoute[] = [
  {
    path: "/",
    element: <LoginPage />,
    can: [],
    index: true,
  },
];

const LoginRoute: FC = () => {
  return (
    <>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              index={route.index}
              element={<AuthRoute can={route.can} element={route.element} />}
            />
          );
        })}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export const LoginRouter = {
  element: <LoginRoute />,
  path: "/Login/*",
};
