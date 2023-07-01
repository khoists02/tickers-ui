/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable react/no-unescaped-entities */
import React, { FC, useState, useRef } from "react";
import AuthBg from "../../../assets/images/bg-1.jpg";
import { useAppDispatch } from "../../../config/store";
import SimpleReactValidator from "simple-react-validator";
import { submitLogin } from "../ducks/opertators";
import { IRootState } from "../../../config/reducers";
import { useSelector } from "react-redux";
import axios from "axios";

const LoginContainer: FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState({});
  const { loading } = useSelector((state: IRootState) => state.authReducer);
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "The :attribute field is required.",
      },
    })
  );
  return (
    <>
      <div
        className="hold-transition theme-primary bg-img"
        style={{ height: "100vh", backgroundImage: `url(${AuthBg})` }}
      >
        <div className="container h-p100">
          <div className="row align-items-center justify-content-md-center h-p100">
            <div className="col-12">
              <div className="row justify-content-center g-0">
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="bg-white rounded10 shadow-lg">
                    <div className="content-top-agile p-20 pb-0">
                      <h2 className="text-primary">Let's Get Started</h2>
                      <p className="mb-0">Sign in to continue to CRMi.</p>
                    </div>
                    <div className="p-40">
                      <form action="index.html" method="post">
                        <div className="form-group">
                          <div className="input-group mb-3">
                            <span className="input-group-text bg-transparent">
                              <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control ps-15 bg-transparent"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }}
                            />
                          </div>
                          <span className="form-text text-danger mt-1">
                            {validator.current.message(
                              "Username",
                              username,
                              "required"
                            )}
                          </span>
                        </div>
                        <div className="form-group">
                          <div className="input-group mb-3">
                            <span className="input-group-text  bg-transparent">
                              <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              className="form-control ps-15 bg-transparent"
                              placeholder="Password"
                            />
                          </div>
                          <span className="form-text text-danger mt-1">
                            {validator.current.message(
                              "Password",
                              password,
                              "required"
                            )}
                          </span>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="checkbox">
                              <input type="checkbox" id="basic_checkbox_1" />
                              <label htmlFor="basic_checkbox_1">
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="fog-pwd text-end">
                              <a className="hover-warning cursor-pointer">
                                <i className="fa fa-unlock"></i> Forgot
                                password?
                              </a>
                              <br />
                            </div>
                          </div>

                          <div className="col-12 text-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                if (!validator.current.allValid()) {
                                  validator.current.showMessages();
                                  setError({});
                                  return;
                                }
                                dispatch(submitLogin(username, password));
                              }}
                              className="btn btn-danger mt-10"
                            >
                              {loading && (
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                />
                              )}
                              SIGN IN
                            </button>
                            {/*
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={async () => {
                                await axios.delete("/auth/deleteAll");
                              }}
                            >
                              Delete All Cookies
                            </button> */}
                          </div>
                        </div>
                      </form>
                      <div className="text-center">
                        <p className="mt-15 mb-0">
                          Don't have an account?{" "}
                          <a
                            href="auth_register.html"
                            className="text-warning ms-5"
                          >
                            Sign Up
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="mt-20 text-white">- Sign With -</p>
                    <p className="gap-items-2 mb-20">
                      <a
                        className="btn btn-social-icon btn-round btn-facebook"
                        href="#"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a
                        className="btn btn-social-icon btn-round btn-twitter"
                        href="#"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a
                        className="btn btn-social-icon btn-round btn-instagram"
                        href="#"
                      >
                        <i className="fa fa-instagram"></i>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
