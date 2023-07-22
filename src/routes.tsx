import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LoginRouter } from "./pages/auth/login";
import { TickersRouter } from "./pages/tickers";
import { FiltersRouter } from "./pages/filters";
import { MigrationsRouter } from "./pages/migrations";
import { PredictionsRouter } from "./pages/predictions";
import { Header } from "./components/parts/Header";
import { Sidebar } from "./components/parts/Sidebar";
import { Footer } from "./components/parts/Footer";
import { PageNotFound } from "./components/PageNotFound";
import ApiError from "./components/ApiError";
import { useSelector } from "react-redux";
import { IRootState } from "./config/reducers";

const combinedRoutes = [
  TickersRouter,
  MigrationsRouter,
  PredictionsRouter,
  FiltersRouter,
];
const loginRoutes = [LoginRouter];

interface IRoute {
  path: string;
  element: React.ReactElement;
}

const generateRoute = (routes: IRoute[]): React.ReactElement => {
  return (
    <>
      {routes.map((route) => {
        return (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      })}
    </>
  );
};

const UnAuthenticatedLayout = (): JSX.Element => {
  return (
    <>
      <ApiError />
      <Outlet />;
    </>
  );
};

const MainLayout = (): JSX.Element => {
  const { collapsed } = useSelector(
    (state: IRootState) => state.sidebarReducer
  );
  return (
    <>
      <ApiError />

      <div
        className={`wrapper sidebar-mini ${
          collapsed ? "sidebar-collapse" : ""
        }`}
        style={{ height: "auto", minHeight: "100%" }}
      >
        <div id="loader" style={{ opacity: "0.05", display: "none" }}></div>
        <Header />
        <Sidebar />
        <div
          className="content-wrapper"
          style={{ minHeight: "calc(100vh - 165px)" }}
        >
          <div className="container-full">
            <section className="content">
              <Outlet />
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const PublicPage = (): JSX.Element => {
  return <Outlet />;
};

const UnAuthenticatedRoutes = (): JSX.Element => {
  const renderRoutes = generateRoute(loginRoutes);
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/Login" />} />
      <Route element={<UnAuthenticatedLayout />}>{renderRoutes}</Route>
    </Routes>
  );
};

const AppRoutes = (): JSX.Element => {
  const renderRoutes = generateRoute(combinedRoutes);
  return (
    <Routes>
      <Route element={<PublicPage />}>
        <Route path="PageNotFound" element={<PageNotFound />}></Route>
        <Route path="/Forbidden" element={<span>Page Forbidden</span>} />
        <Route path="/Error" element={<span>Page 500 Error</span>} />
      </Route>
      <Route path="*" element={<Navigate to="/PageNotFound" />} />
      <Route path="/" element={<Navigate to="/Tickers" />} />
      <Route element={<MainLayout />}>{renderRoutes}</Route>
    </Routes>
  );
};

export { AppRoutes, UnAuthenticatedRoutes };
