import React, { type FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="main-footer">
      <div className="pull-right d-none d-sm-inline-block">
        <ul className="nav nav-primary nav-dotted nav-dot-separated justify-content-center justify-content-md-end">
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://themeforest.net/item/crmi-bootstrap-admin-dashboard-template/33405709"
              target="_blank"
              rel="noreferrer"
            >
              Purchase Now
            </a>
          </li>
        </ul>
      </div>
      © <script>document.write(new Date().getFullYear())</script>2023{" "}
      <a href="https://www.multipurposethemes.com/">Multipurpose Themes</a>. All
      Rights Reserved.
    </footer>
  );
};
