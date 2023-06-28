import React, { type FC, useState } from "react";
import { ITickerFilterSearch } from "./tickerType";
import useTickerTypeDropdown from "../../hooks/useTickerTypeDropdown";
import { Dropdown, IOption } from "../../components/Dropdown";
import { useAppDispatch } from "../../config/store";
import { getTickers } from "./ducks/operators";
import {
  ISearchTickersParam,
  defaultSearchTickersParam,
} from "../../types/tickers";

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
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState<ISearchTickersParam>(
    defaultSearchTickersParam
  );

  return (
    <div className="box">
      <div className="box-body p-0">
        <div className="flexbox align-items-center p-15">
          <div className="flexbox align-items-center">
            <Dropdown
              label="Type"
              option={tickerTypesOption}
              onChange={(item: IOption) => {
                setSearchParams({ ...searchParams, type: item.value });
              }}
            />
            <Dropdown
              label="Market"
              option={tickerMarketOption}
              onChange={(item: IOption) => {
                setSearchParams({ ...searchParams, market: item.value });
              }}
            />
            <Dropdown
              label="Order"
              option={orderOptions}
              onChange={(item: IOption) => {
                setSearchParams({ ...searchParams, order: item.value });
              }}
            />
            <Dropdown
              label="Sort"
              option={sortOptions}
              onChange={(item: IOption) => {
                setSearchParams({ ...searchParams, sort: item.value });
              }}
            />
            <Dropdown
              onChange={(item: IOption) => {
                setSearchParams({
                  ...searchParams,
                  size: parseInt(item.value, 10),
                });
              }}
              label="Limit"
              option={limitOptions}
              defaultSelected={limitOptions.find(
                (x) => x.value === searchParams.size?.toString()
              )}
            />
          </div>

          <div className="flexbox">
            <div className="input-group">
              <input
                value={searchParams.ticker}
                onChange={(e) => {
                  setSearchParams({ ...searchParams, ticker: e.target.value });
                }}
                placeholder="Ticker"
                type="text"
                className="form-control"
              />
            </div>
            <div className="input-group">
              <input
                value={searchParams.search}
                onChange={(e) => {
                  setSearchParams({ ...searchParams, search: e.target.value });
                }}
                placeholder="Search Key"
                type="text"
                className="form-control"
              />
            </div>
          </div>

          <button
            onClick={() => {
              dispatch(getTickers(searchParams));
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
