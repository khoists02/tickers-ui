import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  entities: [],
};

const tickersSlice = createSlice({
  name: "tickersReducer",
  initialState,
  reducers: {
    getTickersStart(state) {
      state.loading = true;
    },
    getTickersSuccess(
      state,
      action,
    ) {
      state.loading = false;
      state.entities = action.payload;
    },
    getTickersFail(state) {
      state.loading = false;
    },
  },
});

export const TickersAction = tickersSlice.actions;
export default tickersSlice.reducer;
