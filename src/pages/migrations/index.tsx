
import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "../../components/AuthRoute";
import { PageNotFound } from "../../components/PageNotFound";

const MigrationsPage = React.lazy(
  async () => await import("./MigrationsContainer")
);

export interface IAuthRoute {
  element?: React.ReactElement;
  path?: string;
  can?: string[];
  index?: boolean;
}

const routes: IAuthRoute[] = [
  {
    path: "/",
    element: <MigrationsPage />,
    can: [],
    index: true,
  },
];

const MigrationsRoute: FC = () => {
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

export const MigrationsRouter = {
  element: <MigrationsRoute />,
  path: "/Migrations/*",
};
