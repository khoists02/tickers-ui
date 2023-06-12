import { combineReducers } from "redux";
import tickersReducer from "../pages/tickers/ducks/slices"
import authReducer from "../pages/auth/ducks/slices"

const rootReducer = combineReducers({
  // 👆🏻 Alphabetically sorted
  authReducer,
  tickersReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
