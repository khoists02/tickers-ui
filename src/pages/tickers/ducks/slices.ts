import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ITickerResponse {
  active?: boolean;
  cik?: string;
  currencyName?: string;
  lastUpdated?: string;
  locale?: string;
  market?: string;
  name?: string;
  primaryExchange?: string;
  ticker?: string;
  type?: string;
}

export interface PaginationPolygonResponse<T> {
  count?: number;
  nextPage?: boolean;
  nextUrl?: string;
  requestId?: string;
  status?: string;
  results: T[]
}

const defaultPagination = {
  nextPage: false,
  cursor: "",
  count: 0,
}

const initialState = {
  loading: false,
  entities: [] as ITickerResponse[],
  pagination: defaultPagination
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
      action: PayloadAction<PaginationPolygonResponse<ITickerResponse>>,
    ) {
      state.loading = false;
      state.entities = action.payload.results;
      state.pagination = {
        nextPage: action.payload.nextPage || false,
        cursor: action.payload.nextUrl || "",
        count: action.payload.count || 0
      }
    },
    getTickersFail(state) {
      state.loading = false;
    },
  },
});

export const TickersAction = tickersSlice.actions;
export default tickersSlice.reducer;
