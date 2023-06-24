import axios from "axios";
import { AppThunk } from "../../../config/store";
import { TickersAction } from "./slices";
import { PaginationResponse } from "../../../types/generic";
import {
  ISearchTickersParam,
  ITickerDetails,
  ITickerResponse,
  TickerDetailsResponse,
} from "../../../types/tickers";

export const getTickers =
  (params?: ISearchTickersParam): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(TickersAction.getTickersStart());

        const response = await axios.get("/tickers", {
          params,
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
  (ticker?: string, date?: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(TickersAction.getDetailsStart());
        const details = await axios.get(`/tickers/${ticker || ""}`);
        const response: TickerDetailsResponse<ITickerDetails> = {
          status: details?.data.status,
          requestId: details?.data ? details.data["request_id"] : "",
          results: details?.data
            ? {
                ...details?.data.results,
                primaryExchange: details?.data.results["primary_exchange"],
                totalEmployees: details?.data.results["total_employees"],
                marketCap: details?.data.results["market_cap"],
                currencyName: details?.data.results["currency_name"],
                iconUrl: details?.data.results["branding"]["icon_url"]?.replace(
                  "https://",
                  ""
                ),
                logoUrl: details?.data.results["branding"]["logo_url"]?.replace(
                  "https://",
                  ""
                ),
                shareClassOutstanding:
                details?.data.results["share_class_shares_outstanding"],
              }
            : null,
        };
        dispatch(TickersAction.getDetailsSuccess(response));
      } catch (error) {
        dispatch(TickersAction.getDetailsFail());
      }
    };
