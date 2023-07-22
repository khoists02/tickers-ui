/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { AppThunk } from "../../../config/store";
import { ErrorMessage, PaginationResponse } from "../../../types/generic";
import { ISearchPredictions, IPredictionRequestAndResponse } from "../../../types/tickers";
import { PredictionsAction } from "./slices";

export const getPredictions =
  (params?: ISearchPredictions): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(PredictionsAction.getPredictionsStart());

        let requestParams = {};

        if (params) {
          const { search, size, page } = params;

          if (search) {
            requestParams = { ...requestParams, name: search }
          }

          if (size) {
            requestParams = { ...requestParams, size }
          }

          if (page) {
            requestParams = { ...requestParams, page }
          }
        }

        const response = await axios.get("/predictions", {
          params: requestParams,
        });

        dispatch(
          PredictionsAction.getPredictionsSuccess(
            response.data as PaginationResponse<IPredictionRequestAndResponse>
          )
        );
      } catch (error) {
        dispatch(PredictionsAction.getPredictionsFail());
      }
    };

export const createPrediction = (model: IPredictionRequestAndResponse): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(PredictionsAction.createPredictionStart());

      if (model.id) {
        await axios.put(`/predictions/${model.id}`, model);
      } else {
        await axios.post("/predictions", model);
      }
      dispatch(PredictionsAction.createPredictionSuccess());
    } catch (error) {
      // @ts-expect-error
      dispatch(PredictionsAction.createPredictionFail(error?.response?.data as ErrorMessage));
    }
  };

export const getPrediction = (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(PredictionsAction.getDetailsStart());
      const response = await axios.get(`/predictions/${id}`);
      dispatch(PredictionsAction.getDetailsSuccess(response.data as IPredictionRequestAndResponse));
    } catch (error) {
      // @ts-expect-error
      dispatch(PredictionsAction.getDetailsFail(error?.response?.data as ErrorMessage));
    }
  };
