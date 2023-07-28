/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { AppThunk } from "../../../config/store";
import { PaginationResponse } from "../../../types/generic";
import { FiltersAction } from "./slices";
import { IFilterResponse, IHistoryDetails, ISearchFilter } from "../../../types/filter";

export const getFilters =
  (params?: ISearchFilter): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(FiltersAction.getFiltersStart());

        let requestParams = {};

        if (params) {
          const { search, size, page, mode, tickerId } = params;

          if (mode) {
            requestParams = { ...requestParams, mode }
          }

          if (search) {
            requestParams = { ...requestParams, searchKey: search }
          }

          if (tickerId) {
            requestParams = { ...requestParams, tickerId }
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

export const getFilterDetails = (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(FiltersAction.getDetailsStart());
      const response = await axios.get(`/filters/${id}`);
      dispatch(FiltersAction.getDetailsSuccess(response.data as IFilterResponse));
    } catch (error) {
      // @ts-expect-error
      dispatch(FiltersAction.getDetailsFail(error?.response?.data as ErrorMessage));
    }
  };

export const checkExistFilterInHistory = (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.get(`/predictions-history/check/${id}`);
      dispatch(FiltersAction.checkFilterInHistorySuccess(response.data as boolean));
    } catch (error) {
    }
  };

export const loadHistoryByFilterId = (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.get(`/predictions-history/${id}`);
      dispatch(FiltersAction.loadHistorySuccess(response.data as IHistoryDetails));
    } catch (error) {
    }
  };
