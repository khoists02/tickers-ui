import { SearchPaginateType } from "./generic";
import { ITickerDetails } from "./tickers";

export interface IFilterResponse {
  id?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  steps?: number;
  scale?: boolean;
  splitByDate?: boolean;
  cols?: string;
  testSize?: number;
  shuffle?: boolean;
  lookStep?: number;
  nSteps?: number;
  epochs?: number;
  batchSize?: number;
  units?: number;
  ticker?: ITickerDetails;
}

export interface ISearchFilter extends SearchPaginateType {
  search?: string;
  mode?: string;
  tickerId?: string;
}

export const defaultSearchFilter: Readonly<ISearchFilter> = {
  search: "",
  page: 0,
  size: 10,
}
