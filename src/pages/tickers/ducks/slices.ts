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

export interface ITickerDetails {
  cik?: string;
  currencyName?: string;
  description?: string;
  locale?: string;
  market?: string;
  marketCap?: string;
  name?: string;
  primaryExchange?: string;
  ticker?: string;
  totalEmployees?: number;
  type?: string;
  iconUrl?: string;
  logoUrl?: string;
  shareClassOutstanding?: number;
}

export interface TickerDetailsResponse<T> {
  requestId?: string;
  status?: string;
  results: T
}

const initialState = {
  loading: false,
  entities: [] as ITickerResponse[],
  pagination: defaultPagination,
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
      action: PayloadAction<PaginationPolygonResponse<ITickerResponse>>,
    ) {
      state.loading = false;
      state.entities = action.payload.results;
      if (action.payload.nextPage) {
        state.pagination = {
          nextPage: true,
          cursor: action.payload.nextUrl || "",
          count: action.payload.count || 0
        }
      } else {
        state.pagination = defaultPagination;
      }
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
