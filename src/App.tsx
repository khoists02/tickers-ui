import React, { type FC } from "react";
import "./assets/styles/scss/style.scss";
import { Header } from "./components/parts/Header";
import { Sidebar } from "./components/parts/Sidebar";
import { Footer } from "./components/parts/Footer";

const App: FC = () => {
  return (
    <div className="wrapper" style={{ height: "auto", minHeight: "100%" }}>
      <div id="loader" style={{ opacity: "0.05", display: "none" }}></div>
      <Header />
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ minHeight: "calc(100vh - 165px)" }}
      ></div>
      <Footer />
    </div>
  );
};

export default App;
