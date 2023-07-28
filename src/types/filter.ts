import { SearchPaginateType } from "./generic";
import { ITickerDetails } from "./tickers";
import * as uuid from "uuid";

export interface IHistoryDetails {
  id?: string;
  loss?: string;
  featurePrice?: string;
  accuracyScore?: string;
  totalBuyProfit?: string;
  totalSellProfit?: string;
  totalProfit?: string;
  profitPerTrade?: string;
}

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

export const defaultFilterHistory: Readonly<IFilterResponse> = {
  id: "",
  name: "",
  startDate: "",
  endDate: "",
  steps: 50,
  scale: true,
  splitByDate: true,
  cols: "adjclose,volume,open,high,low",
  testSize: 0.2,
  shuffle: false,
  lookStep: 15,
  nSteps: 100,
  epochs: 50,
  batchSize: 265,
  units: 50,
  ticker: undefined,
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

export const headerCols = [
  {
    id: uuid.v4(),
    label: "Start Date",
    show: true,
    width: 150,
    type: "dateTime",
    field: "startDate",
  },
  {
    id: uuid.v4(),
    label: "End Date",
    show: true,
    width: 150,
    type: "dateTime",
    field: "endDate",
  },
  {
    id: uuid.v4(),
    label: "Steps",
    show: true,
    width: 150,
    type: "number",
    field: "steps",
  },
  {
    id: uuid.v4(),
    label: "Scale",
    show: true,
    width: 150,
    type: "boolean",
    field: "scale",
  },
  {
    id: uuid.v4(),
    label: "Test Size",
    show: true,
    width: 150,
    type: "number",
    field: "testSize",
  },
  {
    id: uuid.v4(),
    label: "Look Steps",
    show: true,
    width: 150,
    type: "number",
    field: "lookStep",
  },
  {
    id: uuid.v4(),
    label: "Epochs",
    show: false,
    width: 150,
    type: "number",
    field: "epochs",
  },
  {
    id: uuid.v4(),
    label: "Shuffle",
    show: true,
    width: 80,
    type: "boolean",
    field: "shuffle",
  },
  {
    id: uuid.v4(),
    label: "Batch Size",
    show: false,
    width: 150,
    type: "number",
    field: "batchSize",
  },
  {
    id: uuid.v4(),
    label: "Units",
    show: false,
    width: 150,
    type: "number",
    field: "units",
  },
];
