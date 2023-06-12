import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  entities: [],
};

const tickersSlice = createSlice({
  name: "tickersReducer",
  initialState,
  reducers: {
    getStudiesStart(state) {
      state.loading = true;
    },
    getStudiesSuccess(
      state,
      action,
    ) {
      state.loading = false;
      state.entities = action.payload;
    },
    getStudiesFail(state) {
      state.loading = false;
    },
  },
});

export const TickersAction = tickersSlice.actions;
export default tickersSlice.reducer;
