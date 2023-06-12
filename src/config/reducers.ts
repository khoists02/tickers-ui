import { combineReducers } from "redux";
import tickersReducer from "../pages/tickers/ducks/slices"
import authReducer from "../pages/auth/ducks/slices"
import errorReducer from "../reducers/errorSlice";

const rootReducer = combineReducers({
  // 👆🏻 Alphabetically sorted
  authReducer,
  errorReducer,
  tickersReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
