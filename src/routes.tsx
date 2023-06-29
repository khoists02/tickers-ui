import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { TickersRouter } from "./pages/tickers";
import { MigrationsRouter } from "./pages/migrations";
import { PredictionsRouter } from "./pages/predictions";
import { Header } from "./components/parts/Header";
import { Sidebar } from "./components/parts/Sidebar";
import { Footer } from "./components/parts/Footer";
import { PageNotFound } from "./components/PageNotFound";
import ApiError from "./components/ApiError";
import { useSelector } from "react-redux";
import { IRootState } from "./config/reducers";

const combinedRoutes = [TickersRouter, MigrationsRouter, PredictionsRouter];

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
      <Route path="/" element={<Navigate to="/Dashboard" />} />
      <Route element={<MainLayout />}>{renderRoutes}</Route>
    </Routes>
  );
};

export { AppRoutes };
