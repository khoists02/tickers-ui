

import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "../../components/AuthRoute";
import { PageNotFound } from "../../components/PageNotFound";

const PredictionsPage = React.lazy(
  async () => await import("./PredictionsContainer")
);

const PredictionsCreateUpdate = React.lazy(
  async () => await import("./PredictionsCreateUpdate")
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
    element: <PredictionsPage />,
    can: [],
    index: true,
  },
  {
    path: "/Create",
    element: <PredictionsCreateUpdate />,
    can: [],
    index: true,
  },
  {
    path: ":id/Edit",
    element: <PredictionsCreateUpdate />,
    can: [],
    index: true,
  },
];

const PredictionsRoute: FC = () => {
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

export const PredictionsRouter = {
  element: <PredictionsRoute />,
  path: "/Predictions/*",
};
