import React, { type FC, useState } from "react";
import { ITickerFilterSearch } from "./tickerType";
import useTickerTypeDropdown from "../../hooks/useTickerTypeDropdown";
import { Dropdown, IOption } from "../../components/Dropdown";
import { useAppDispatch } from "../../config/store";
import { getTickers } from "./ducks/operators";

interface ITickersFilter {
  onFilter: (filter?: ITickerFilterSearch) => void;
}

const orderOptions: IOption[] = [
  {
    label: "ASC",
    value: "asc",
  },
  {
    label: "DESC",
    value: "desc",
  },
];

const sortOptions: IOption[] = [
  {
    label: "Ticker",
    value: "ticker",
  },
  {
    label: "Name",
    value: "name",
  },
];

const limitOptions: IOption[] = [
  {
    label: "50",
    value: "50",
  },
  {
    label: "100",
    value: "100",
  },
  {
    label: "200",
    value: "200",
  },
  {
    label: "500",
    value: "500",
  },
  {
    label: "1000",
    value: "1000",
  },
];

export const TickersFilter: FC<ITickersFilter> = ({ onFilter }) => {
  const tickerTypesOption: IOption[] = useTickerTypeDropdown();
  const tickerMarketOption: IOption[] = [
    {
      label: "Stocks",
      value: "stocks",
    },
    {
      label: "Crypto",
      value: "crypto",
    },
    {
      label: "Fx",
      value: "fx",
    },
    {
      label: "Otc",
      value: "otc",
    },
    {
      label: "Indices",
      value: "indices",
    },
  ];
  const [searchKey, setSearchKey] = useState("");
  const [ticker, setTicker] = useState("");
  const dispatch = useAppDispatch();

  return (
    <div className="box">
      <div className="box-body p-0">
        <div className="flexbox align-items-center p-15">
          <div className="flexbox align-items-center">
            <Dropdown label="Type" option={tickerTypesOption} />
            <Dropdown label="Market" option={tickerMarketOption} />
            <Dropdown label="Order" option={orderOptions} />
            <Dropdown label="Sort" option={sortOptions} />
            <Dropdown
              label="Limit"
              option={limitOptions}
              defaultSelected={limitOptions.find((x) => x.value === "100")}
            />
          </div>

          <div className="flexbox">
            <div className="lookup lookup-circle lookup-right">
              <input
                value={ticker}
                onChange={(e) => {
                  setTicker(e.target.value);
                }}
                placeholder="Ticker"
                type="text"
              />
            </div>
            <div className="lookup lookup-circle lookup-right">
              <input
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                placeholder="Search Key"
                type="text"
              />
            </div>
          </div>

          <button
            onClick={() => {
              dispatch(getTickers());
            }}
            type="button"
            className="waves-effect waves-light btn btn-primary"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
