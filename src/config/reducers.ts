import { combineReducers } from "redux";
import tickersReducer from "../pages/tickers/ducks/slices";
import predictionsReducer from "../pages/predictions/ducks/slices";
import authReducer from "../pages/auth/ducks/slices";
import errorReducer from "../reducers/errorSlice";

const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  tickersReducer,
  predictionsReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
