/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { AppThunk } from "../../../config/store";
import { PaginationResponse } from "../../../types/generic";
import { FiltersAction } from "./slices";
import { IFilterResponse, ISearchFilter } from "../../../types/filter";

export const getFilters =
  (params?: ISearchFilter): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(FiltersAction.getFiltersStart());

        let requestParams = {};

        if (params) {
          const { search, size, page, mode } = params;

          if (mode) {
            requestParams = { ...requestParams, mode }
          }

          if (search) {
            requestParams = { ...requestParams, searchKey: search }
          }

          if (size) {
            requestParams = { ...requestParams, size }
          }

          if (page) {
            requestParams = { ...requestParams, page }
          }
        }

        const response = await axios.get("/filters", {
          params: requestParams,
        });

        dispatch(
          FiltersAction.getFiltersSuccess(
            response.data as PaginationResponse<IFilterResponse>
          )
        );
      } catch (error) {
        dispatch(FiltersAction.getFiltersFail());
      }
    };

// export const getPrediction = (id: string): AppThunk =>
//   async (dispatch) => {
//     try {
//       dispatch(PredictionsAction.getDetailsStart());
//       const response = await axios.get(`/predictions/${id}`);
//       dispatch(PredictionsAction.getDetailsSuccess(response.data as IPredictionRequestAndResponse));
//     } catch (error) {
//       // @ts-expect-error
//       dispatch(PredictionsAction.getDetailsFail(error?.response?.data as ErrorMessage));
//     }
//   };
