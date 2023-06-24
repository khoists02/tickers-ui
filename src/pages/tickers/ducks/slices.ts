import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaginationResponse, initPageable } from "../../../types/generic";
import { ITickerDetails, ITickerResponse, TickerDetailsResponse } from "../../../types/tickers";

const initialState = {
  loading: false,
  entities: [] as ITickerResponse[],
  pageable: initPageable,
  entity: null as ITickerDetails | null,
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
      action: PayloadAction<PaginationResponse<ITickerResponse>>,
    ) {
      state.loading = false;
      state.entities = action.payload.content;
      state.pageable = action.payload.pageable;
    },
    getTickersFail(state) {
      state.loading = false;
    },
    getDetailsStart(state) {
      state.loading = true;
    },
    getDetailsSuccess(
      state,
      action: PayloadAction<TickerDetailsResponse<ITickerDetails>>,
    ) {
      state.loading = false;
      state.entity = action.payload.results;
    },
    getDetailsFail(state) {
      state.loading = false;
    },
  },
});

export const TickersAction = tickersSlice.actions;
export default tickersSlice.reducer;
