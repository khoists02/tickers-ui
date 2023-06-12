/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import axios from "axios";
import { AppThunk } from "../../../config/store";
import { TickersAction } from "./slices";

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
  limit: 100
}

export const getTickers =
  (params?: ISearchTickersParam): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(TickersAction.getTickersStart());

        const studies = await axios.get("/tickers", {
          params,
        });
        dispatch(
          TickersAction.getTickersSuccess(
            studies.data.results
          )
        );
      } catch (error) {
        dispatch(TickersAction.getTickersFail());
      }
    };
