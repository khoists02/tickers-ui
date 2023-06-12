/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from "react";
import axios from "axios";
import { IOption } from "../components/Dropdown";

const useTickerTypeDropdown = (): IOption[] => {
  const [types, setTypes] = useState<IOption[] | undefined>(undefined);
  useEffect(() => {
    const getTickerTypes = async () => {
      const params = {
        asset_class: "",
        locale: "",
      };
      const data = await axios.get("/tickers/types", { params });
      setTypes(
        data.data.results.map((x: { code: string }) => {
          return {
            label: x.code,
            value: x.code,
          };
        })
      );
    };
    if (types == null) getTickerTypes();
  }, [types]);

  return types ?? [];
};

export default useTickerTypeDropdown;
