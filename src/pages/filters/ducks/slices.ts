import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorMessage, PaginationResponse, initPageable } from "../../../types/generic";
import { IFilterResponse, IHistoryDetails } from "../../../types/filter";

const initialState = {
  loading: false,
  entities: [] as IFilterResponse[],
  pageable: initPageable,
  // entity: null as IFilterResponse | null,
  updated: false,
  errorMessage: null as unknown as ErrorMessage,
  entity: null as unknown as IFilterResponse,
  exits: false as boolean,
  history: null as unknown as IHistoryDetails,
};

const filtersSlice = createSlice({
  name: "filtersReducer",
  initialState,
  reducers: {
    getFiltersStart(state) {
      state.loading = true;
    },
    getFiltersSuccess(
      state,
      action: PayloadAction<PaginationResponse<IFilterResponse>>,
    ) {
      state.loading = false;
      state.entities = action.payload.content;
      state.pageable = action.payload.pageable;
    },
    getFiltersFail(state) {
      state.loading = false;
      state.entities = [];
      state.pageable = initPageable;
    },
    clearState: () => initialState,
    getDetailsStart(state) {
      state.loading = true;
    },
    getDetailsSuccess(state, action: PayloadAction<IFilterResponse>) {
      state.entity = action.payload;
      state.loading = false;
    },
    getDetailsFail(state, action: PayloadAction<ErrorMessage>) {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    checkFilterInHistorySuccess(state, action: PayloadAction<boolean>) {
      state.exits = action.payload;
    },
    loadHistoryStart(state) {
      state.loading = true;
    },
    loadHistorySuccess(state, action: PayloadAction<IHistoryDetails>) {
      state.history = action.payload;
    },
    loadHistoryFail(state) {
      state.loading = false;
    }
  },
});

export const FiltersAction = filtersSlice.actions;
export default filtersSlice.reducer;
