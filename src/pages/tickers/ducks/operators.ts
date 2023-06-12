import axios from "axios";
import { AppThunk } from "../../../config/store";
import { TickersAction } from "./slices";

export const getTickers =
  (): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(TickersAction.getStudiesStart());
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
          TickersAction.getStudiesSuccess(
            studies.data.results
          )
        );
      } catch (err) {
        dispatch(TickersAction.getStudiesFail());
      }
    };
