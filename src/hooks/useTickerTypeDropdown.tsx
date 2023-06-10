/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from "react";
import axios from "axios";
import { IOption } from "../components/Dropdown";

const useTickerTypeDropdown = (): IOption[] => {
  const [types, setTypes] = useState<IOption[] | undefined>(undefined);
  useEffect(() => {
    const getTickerTypes = async () => {
      const data = await axios.get("/types");
      setTypes(
        data.data.content.map((x: { code: string; name: string }) => {
          return {
            label: x.name,
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
