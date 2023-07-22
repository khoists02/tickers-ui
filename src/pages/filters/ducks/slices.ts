import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorMessage, PaginationResponse, initPageable } from "../../../types/generic";
import { IFilterResponse } from "../../../types/filter";

const initialState = {
  loading: false,
  entities: [] as IFilterResponse[],
  pageable: initPageable,
  // entity: null as IFilterResponse | null,
  updated: false,
  errorMessage: null as unknown as ErrorMessage,
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
    // createFilterStart(state) {
    //   state.loading = true;
    //   state.updated = false;
    // },
    // createFilterSuccess(state) {
    //   state.loading = false;
    //   state.updated = true;
    // },
    // createFilterFail(state, action: PayloadAction<ErrorMessage>) {
    //   state.loading = false;
    //   state.updated = false;
    //   state.errorMessage = action.payload;
    // },
    clearState: () => initialState,
    // getDetailsStart(state) {
    //   state.loading = true;
    // },
    // getDetailsSuccess(state, action: PayloadAction<IPredictionRequestAndResponse>) {
    //   state.entity = action.payload;
    //   state.loading = false;
    // },
    // getDetailsFail(state, action: PayloadAction<ErrorMessage>) {
    //   state.loading = false;
    //   state.errorMessage = action.payload;
    // }
  },
});

export const FiltersAction = filtersSlice.actions;
export default filtersSlice.reducer;
