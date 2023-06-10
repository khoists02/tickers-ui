import { Middleware } from "redux";
import { IRootState } from "./reducers";

const apiMiddleware: Middleware<unknown, IRootState> =
  () => (next) => (action) => {
    return next(action);
  };

export default apiMiddleware;
