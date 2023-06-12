import axios from "axios";
import { AppThunk } from "../../../config/store";
import { AuthAction } from "./slices";

export const getCsrfToken =
  (): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(AuthAction.getCsrfStart());

        const data = await axios.post("/csrf");
        dispatch(
          AuthAction.getCsrfSuccess(
            data.data.token
          )
        );
      } catch (err) {
        dispatch(AuthAction.getCsrfFail());
      }
    };
