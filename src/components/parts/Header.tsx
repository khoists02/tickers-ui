import React, { type FunctionComponent } from "react";
import {
  LogoDarkText,
  LogoLetter,
  LogoLetterWhite,
  LogoLightText,
} from "../../constants";
import { useAppDispatch } from "../../config/store";
import { SidebarAction } from "../../reducers/sidebarSlice";

export const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  return (
    <header className="main-header">
      <div className="d-flex align-items-center logo-box justify-content-start d-md-none d-block">
        <a href="index.html" className="logo">
          <div className="logo-mini w-30">
            <span className="light-logo">
              <img src={LogoLetter} alt="logo" />
            </span>
            <span className="dark-logo">
              <img src={LogoLetterWhite} alt="logo" />
            </span>
          </div>
          <div className="logo-lg">
            <span className="light-logo">
              <img src={LogoDarkText} alt="logo" />
            </span>
            <span className="dark-logo">
              <img src={LogoLightText} alt="logo" />
            </span>
          </div>
        </a>
      </div>
      <nav className="navbar navbar-static-top">
        <div className="app-menu">
          <ul className="header-megamenu nav">
            <li className="btn-group nav-item">
              <a
                aria-hidden
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(SidebarAction.toggle());
                }}
                className="waves-effect waves-light nav-link push-btn btn-primary-light"
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </a>
            </li>
            <li className="btn-group d-lg-inline-flex d-none">
              <div className="app-menu">
                <div className="search-bx mx-5">
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit" id="button-addon3">
                        <i className="icon-Search">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* <div className="navbar-custom-menu r-side">
          <ul className="nav navbar-nav">
            <li className="btn-group nav-item">
              <a
                href="reports.html"
                className="waves-effect waves-light nav-link bg-primary btn-primary w-auto fs-14"
                title="Full Screen"
              >
                Generate Report
              </a>
            </li>
          </ul>
        </div> */}
      </nav>
    </header>
  );
};
