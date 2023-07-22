/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type FunctionComponent, useState } from "react";
import { LogoLetter } from "../../constants";
import { NavLink } from "react-router-dom";
import Avatar from "../../assets/images/avatar-13.png";
import { useAppDispatch } from "../../config/store";
import { logout } from "../../pages/auth/ducks/opertators";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";

interface INavBarItem {
  path: string;
  name: string;
  icon?: string;
  show?: boolean;
}

const items: INavBarItem[] = [
  {
    path: "/Tickers",
    name: "Tickers",
    icon: "fa fa-diamond",
    show: true,
  },
  {
    path: "/Migrations",
    name: "Migrations",
    icon: "fa fa-compress",
    show: false,
  },
  {
    path: "/Predictions",
    name: "Predictions",
    icon: "fa fa-braille",
    show: true,
  },
  {
    path: "/Filters",
    name: "Filters",
    icon: "fa fa-filter",
    show: true,
  },
];

export const Sidebar: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const getStyleContent = (): React.CSSProperties => {
    return {
      position: "absolute",
      inset: "0px auto auto 0px",
      margin: 0,
      transform: "translate(82px, 166px)",
    };
  };
  const [pathSelect, setPathSelect] = useState(window.location.pathname);
  const [show, setShow] = useState(false);
  const { authenticatedUser } = useSelector(
    (state: IRootState) => state.authReducer
  );
  return (
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
        <div
          className="user-profile my-15 px-20 py-10 b-1 rounded10 mx-15 cursor-pointer"
          onClick={() => {
            setShow(!show);
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="image d-flex align-items-center">
              <img src={Avatar} className="rounded-0 me-10" alt="User Image" />
              <div>
                <h4 className="mb-0 fw-600">{authenticatedUser?.username}</h4>
                <p className="mb-0">Super Admin</p>
              </div>
            </div>
            <div className="info">
              <a
                className={`dropdown-toggle p-15 d-grid ${show ? "show" : ""}`}
                data-bs-toggle="dropdown"
                href="#"
                aria-expanded="false"
              ></a>
              <div
                className={`dropdown-menu dropdown-menu-end ${
                  show ? "show" : ""
                }`}
                style={getStyleContent()}
              >
                <a className="dropdown-item">
                  <i className="ti-user"></i> Profile
                </a>
                <a className="dropdown-item">
                  <i className="ti-email"></i> Inbox
                </a>
                <a className="dropdown-item">
                  <i className="ti-link"></i> Conversation
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <i className="ti-lock"></i> Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="multinav">
          <div className="multinav-scroll ps" style={{ height: "97%" }}>
            <ul className="sidebar-menu tree main-menu">
              {items
                .filter((f) => f.show)
                .map((item) => {
                  return (
                    <li
                      onClick={() => {
                        setPathSelect(item.path);
                      }}
                      className={
                        window.location.pathname === item.path ||
                        pathSelect === item.path
                          ? "active"
                          : ""
                      }
                      key={item.path}
                    >
                      <NavLink to={item.path}>
                        <i className={item.icon}></i>
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </aside>
  );
};
