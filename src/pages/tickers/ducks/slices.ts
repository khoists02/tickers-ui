import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaginationResponse, initPageable } from "../../../types/generic";
import { ITickerDetailsResponse, ITickerResponse } from "../../../types/tickers";
import { IStockData } from "../../../types/stocks";

const initialState = {
  loading: false,
  entities: [] as ITickerResponse[],
  pageable: initPageable,
  entity: null as ITickerDetailsResponse | null,
  stocks: [] as IStockData[],
  tickers: [] as string[]
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
    getStockDataSuccess(state, action: PayloadAction<IStockData[]>) {
      state.stocks = action.payload;
    },
    getTickersBySicsSuccess(state, action: PayloadAction<string[]>) {
      state.tickers = action.payload;
    }
  },
});

export const TickersAction = tickersSlice.actions;
export default tickersSlice.reducer;
