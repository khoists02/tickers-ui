import React, { type FC } from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/images/404.jpg";

export const PageNotFound: FC = () => {
  return (
    <section className="error-page h-p100">
      <div className="container h-p100">
        <div className="row h-p100 align-items-center justify-content-center text-center">
          <div className="col-lg-7 col-md-10 col-12">
            <div className="rounded10 p-50">
              <img src={NotFoundImage} className="max-w-200" alt="" />
              <h1>Page Not Found !</h1>
              <h3>looks like, page does not exist</h3>
              <div className="my-30">
                <Link to="/" className="btn btn-danger">
                  Back to dashboard
                </Link>
              </div>

              <form className="search-form mx-auto mt-30 w-p75">
                <div className="input-group rounded5 overflow-h">
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Search"
                  />
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
