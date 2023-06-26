import axios from "axios";
import { AppThunk } from "../../../config/store";
import { TickersAction } from "./slices";
import { PaginationResponse } from "../../../types/generic";
import {
  ISearchTickersParam,
  ITickerResponse,
} from "../../../types/tickers";

export const getTickers =
  (params?: ISearchTickersParam): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(TickersAction.getTickersStart());

        let requestParams = {};

        if (params) {
          const { search, type, size, ticker } = params;

          if (ticker) {
            requestParams = { ...requestParams, ticker }
          }

          if (search) {
            requestParams = { ...requestParams, search }
          }

          if (type) {
            requestParams = { ...requestParams, type }
          }

          if (size) {
            requestParams = { ...requestParams, size }
          }
        }

        const response = await axios.get("/tickers", {
          params: requestParams,
        });

        dispatch(
          TickersAction.getTickersSuccess(
            response.data as PaginationResponse<ITickerResponse>
          )
        );
      } catch (error) {
        dispatch(TickersAction.getTickersFail());
      }
    };

export const getTickersPagination =
  (cursor?: string): AppThunk =>
    async (dispatch) => {
      let result;
      try {
        if (cursor) {
          const queryParameters = new URL(cursor);
          result = queryParameters.searchParams.get("cursor");
        }
        dispatch(TickersAction.getTickersStart());

        const studies = await axios.get("/tickers/pagination", {
          params: { cursor: result },
        });
        dispatch(TickersAction.getTickersSuccess(studies.data));
      } catch (error) {
        dispatch(TickersAction.getTickersFail());
      }
    };
export const getTickerDetails =
  (id?: string, date?: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(TickersAction.getDetailsStart());
        const details = await axios.get(`/tickers/${id || ""}`);
        dispatch(TickersAction.getDetailsSuccess(details.data));
      } catch (error) {
        dispatch(TickersAction.getDetailsFail());
      }
    };

export const getStockDataByTicker =
  (ticker: string, type = "WEEKLY"): AppThunk =>
    async (dispatch) => {
      try {
        const details = await axios.get(`/stocks/${ticker}`, {
          params: { type }
        });
        dispatch(TickersAction.getStockDataSuccess(details.data));
      } catch (error) {
        console.log({ error })
      }
    };

export const getTickersBySics = (sics: string[]): AppThunk =>
  async (dispatch) => {
    let params = {};
    if (sics.length) {
      params = {
        sics: sics.toString(),
      }
    }
    try {
      const details = await axios.get(`/tickers/sics`, {
        params
      });
      dispatch(TickersAction.getTickersBySicsSuccess(details.data.content?.map((x: { ticker: string }) => x.ticker)));
    } catch (error) {
      console.log({ error })
    }
  };

export const getCloseByTickerIds = (tickers: string[]): AppThunk =>
  async (dispatch) => {
    let params = {};
    if (tickers.length) {
      params = {
        tickers: tickers.toString(),
      }
    }
    try {
      const response = await axios.get(`/stocks/tickers`, {
        params
      });
      dispatch(TickersAction.getCloseByTickerIdsSuccess(response.data.content));
    } catch (error) {
      console.log({ error })
    }
  };
