import React, { type FC } from "react";
import "./assets/styles/scss/style.scss";
import LogoLetter from "./assets/images/logo-letter.png";
// import LogoLetterWhite from "./assets/images/logo-letter-white.png";
// import LogoDarkText from "./assets/images/logo-dark-text.png";
// import LogoLightText from "./assets/images/logo-light-text.png";

const App: FC = () => {
  return (
    <div className="wrapper" style={{ height: "auto", minHeight: "100%" }}>
      <div id="loader" style={{ opacity: "0.05", display: "none" }}></div>
      <header className="main-header">
        <div className="d-flex align-items-center logo-box justify-content-start d-md-none d-block"></div>
      </header>
      <aside className="main-sidebar">
        <section className="sidebar position-relative">
          <div className="d-flex align-items-center logo-box justify-content-start d-md-block d-none">
            <a href="#" className="logo">
              <div className="logo-mini">
                <span className="light-logo">
                  <img src={LogoLetter} alt="logo" />
                </span>
              </div>
              <div className="logo-lg">
                <span className="light-logo fs-36 fw-700">
                  CRM
                  <span className="text-primary">i</span>
                </span>
              </div>
            </a>
          </div>
        </section>
      </aside>
      <div className="content-wrapper"></div>
      <footer className="main-footer"></footer>
    </div>
  );
};

export default App;
