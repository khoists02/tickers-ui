import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "../../components/AuthRoute";
import { PageNotFound } from "../../components/PageNotFound";

const Tickers = React.lazy(async () => await import("./TickerContainer"));
const TickerDetails = React.lazy(
  async () => await import("./TickerDetailsContainer")
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
    element: <Tickers />,
    can: [],
    index: true,
  },
  {
    path: ":ticker",
    element: <TickerDetails />,
    can: [],
    index: true,
  },
];

const TickersRoute: FC = () => {
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

export const TickersRouter = {
  element: <TickersRoute />,
  path: "/Tickers/*",
};
