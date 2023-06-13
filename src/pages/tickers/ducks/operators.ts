/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import axios from "axios";
import { AppThunk } from "../../../config/store";
import { ITickerResponse, PaginationPolygonResponse, TickersAction } from "./slices";

export interface ISearchTickersParam {
  search?: string;
  ticker?: string;
  type?: string;
  limit?: number;
  sort?: string;
  order?: string;
  market?: string;
}

export const defaultSearchTickersParam: Readonly<ISearchTickersParam> = {
  search: "",
  type: "",
  ticker: "",
  market: "",
  sort: "",
  order: "",
  limit: 100,
};

export const getTickers =
  (params?: ISearchTickersParam): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(TickersAction.getTickersStart());

        const studies = await axios.get("/tickers", {
          params,
        });

        const response: PaginationPolygonResponse<ITickerResponse> = {
          count: studies.data?.count,
          nextPage: studies.data ? studies.data["next_page"] : false,
          nextUrl: studies.data ? studies.data["next_url"] : "",
          requestId: studies.data ? studies.data["request_id"] : "",
          results: studies.data?.results.map((x: any) => {
            return {
              ...x,
              currencyName: x["currency_name"],
              lastUpdated: x["last_updated_utc"],
              primaryExchange: x["primary_exchange"],
            }
          })
        }

        dispatch(TickersAction.getTickersSuccess(response));
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
