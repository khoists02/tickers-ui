import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorMessage, PaginationResponse, initPageable } from "../../../types/generic";
import { IPredictionRequestAndResponse } from "../../../types/tickers";
import { format } from "date-fns";

const initialState = {
  loading: false,
  entities: [] as IPredictionRequestAndResponse[],
  pageable: initPageable,
  entity: null as IPredictionRequestAndResponse | null,
  updated: false,
  errorMessage: null as unknown as ErrorMessage,
};

const predictionsSlice = createSlice({
  name: "predictionsReducer",
  initialState,
  reducers: {
    getPredictionsStart(state) {
      state.loading = true;
    },
    getPredictionsSuccess(
      state,
      action: PayloadAction<PaginationResponse<IPredictionRequestAndResponse>>,
    ) {
      state.loading = false;
      state.entities = action.payload.content.map((x: IPredictionRequestAndResponse) => {
        return {
          ...x,
          trainFilter: x.trainFilter?.split(",")?.map((t) => format(new Date(t), "yyyy-MM-dd"))?.join(" To "),
          testFilter: x.testFilter?.split(",")?.map((t) => format(new Date(t), "yyyy-MM-dd"))?.join(" To ")
        }
      });
      state.pageable = action.payload.pageable;
    },
    getPredictionsFail(state) {
      state.loading = false;
      state.entities = [];
      state.pageable = initPageable;
    },
    createPredictionStart(state) {
      state.loading = true;
      state.updated = false;
    },
    createPredictionSuccess(state) {
      state.loading = false;
      state.updated = true;
    },
    createPredictionFail(state, action: PayloadAction<ErrorMessage>) {
      state.loading = false;
      state.updated = false;
      state.errorMessage = action.payload;
    },
    clearState: () => initialState,
    getDetailsStart(state) {
      state.loading = true;
    },
    getDetailsSuccess(state, action: PayloadAction<IPredictionRequestAndResponse>) {
      state.entity = action.payload;
      state.loading = false;
    },
    getDetailsFail(state, action: PayloadAction<ErrorMessage>) {
      state.loading = false;
      state.errorMessage = action.payload;
    }
  },
});

export const PredictionsAction = predictionsSlice.actions;
export default predictionsSlice.reducer;
