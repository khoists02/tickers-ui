import React, { type FunctionComponent } from "react";
import { LogoLetter } from "../../constants";

export const Sidebar: FunctionComponent = () => {
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
        <div className="multinav">
          <div className="multinav-scroll ps" style={{ height: "97%" }}>
            <ul className="sidebar-menu tree">
              <li className="header">Main Menu</li>
              <li className="active">
                <a href="index.html">
                  <i className="icon-Layout-4-blocks">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="icon-Library">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                  <span>Features</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-right pull-right"></i>
                  </span>
                </a>
                <ul className="treeview-menu" style={{ display: "none" }}>
                  <li className="treeview">
                    <a href="#">
                      <i className="icon-Commit">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      Card
                      <span className="pull-right-container">
                        <i className="fa fa-angle-right pull-right"></i>
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="box_cards.html">
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          User Card
                        </a>
                      </li>
                      <li>
                        <a href="box_advanced.html">
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Advanced Card
                        </a>
                      </li>
                      <li>
                        <a href="box_basic.html">
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Basic Card
                        </a>
                      </li>
                      <li>
                        <a href="box_color.html">
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Card Color
                        </a>
                      </li>
                      <li>
                        <a href="box_group.html">
                          <i className="icon-Commit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                          Card Group
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </aside>
  );
};
