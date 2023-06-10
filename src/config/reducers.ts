import { combineReducers } from "redux";

const rootReducer = combineReducers({
  // 👆🏻 Alphabetically sorted
});

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
