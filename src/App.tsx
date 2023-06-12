/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, type FC } from "react";
import axios from "axios";
import "./assets/styles/scss/style.scss";
import { AppRoutes } from "./routes";

const App: FC = () => {
  useEffect(() => {
    const getCsrfToken = async () => {
      await axios.post("/csrf");
    };

    getCsrfToken();
  }, []);
  return (
    <>
      <AppRoutes />;
    </>
  );
};

export default App;
