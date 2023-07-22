/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from "react";
import axios from "axios";
import { IOption } from "../components/Dropdown";
import { IPredictionRequestAndResponse } from "../types/tickers";

const usePredictionsDropdown = (): IOption[] => {
  const [predictions, setPredictions] = useState<IOption[] | undefined>(
    undefined
  );
  useEffect(() => {
    const getPredictions = async () => {
      const data = await axios.get("/predictions", {
        params: { mode: "dropdown" },
      });
      setPredictions(
        (data?.data?.content || []).map((x: IPredictionRequestAndResponse) => {
          return {
            value: x.id,
            label: x.name,
          };
        })
      );
    };
    if (predictions == null) getPredictions();
  }, [predictions]);

  return predictions ?? [];
};

export default usePredictionsDropdown;
