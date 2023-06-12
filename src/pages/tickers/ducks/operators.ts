/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import axios from "axios";
import { AppThunk } from "../../../config/store";
import { TickersAction } from "./slices";

export const getTickers =
  (): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(TickersAction.getTickersStart());
        const requestParams = {
          search: "",
          type: "",
          ticker: "",
          limit: 100
        };

        const studies = await axios.get("/tickers", {
          params: requestParams,
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
