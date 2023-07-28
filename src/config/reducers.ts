import { combineReducers } from "redux";
import tickersReducer from "../pages/tickers/ducks/slices";
import predictionsReducer from "../pages/predictions/ducks/slices";
import filtersReducer from "../pages/filters/ducks/slices";
import authReducer from "../pages/auth/ducks/slices";
import errorReducer from "../reducers/errorSlice";
import sidebarReducer from "../reducers/sidebarSlice";

const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  tickersReducer,
  predictionsReducer,
  sidebarReducer,
  filtersReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
