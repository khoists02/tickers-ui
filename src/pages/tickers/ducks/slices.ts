import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaginationResponse, initPageable } from "../../../types/generic";
import { ITickerClose, ITickerDetailsResponse, ITickerResponse } from "../../../types/tickers";
import { IStockData } from "../../../types/stocks";

const initialState = {
  loading: false,
  entities: [] as ITickerResponse[],
  pageable: initPageable,
  entity: null as ITickerDetailsResponse | null,
  stocks: [] as IStockData[],
  tickers: [] as string[],
  tickersClose: [] as ITickerClose[],
  updatedUUId: "",
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
      action: PayloadAction<ITickerDetailsResponse>,
    ) {
      state.loading = false;
      state.entity = action.payload;
    },
    getDetailsFail(state) {
      state.loading = false;
    },
    getStockDataSuccess(state, action) {
      state.stocks = action.payload.content;
      state.updatedUUId = action.payload.id;
    },
    getTickersBySicsSuccess(state, action: PayloadAction<string[]>) {
      state.tickers = action.payload;
    },
    getCloseByTickerIdsSuccess(state, action: PayloadAction<ITickerClose[]>) {
      state.tickersClose = action.payload;
    }
  },
});

export const TickersAction = tickersSlice.actions;
export default tickersSlice.reducer;
