import { SearchPaginateType } from "./generic";

export interface ITickerDetailsResponse {
  sicDescription?: string;
  active?: boolean;
  cik?: string;
  currencyName?: string;
  lastUpdated?: string;
  locale?: string;
  market?: string;
  name?: string;
  primaryExchange?: string;
  ticker?: string;
  type?: string;
  id?: string;
}

export interface ITickerResponse {
  id?: string;
  lastUpdated?: string;
  tickerDetails: ITickerDetailsResponse
}

export interface IPredictionRequestAndResponse {
  id?: string;
  name?: string;
  trainFilter?: string;
  testFilter?: string;
}

export interface ITickerDetails {
  cik?: string;
  currencyName?: string;
  description?: string;
  locale?: string;
  market?: string;
  marketCap?: string;
  name?: string;
  primaryExchange?: string;
  ticker?: string;
  totalEmployees?: number;
  type?: string;
  iconUrl?: string;
  logoUrl?: string;
  shareClassOutstanding?: number;
}

export interface TickerDetailsResponse<T> {
  requestId?: string;
  status?: string;
  results: T
}

export interface ISearchPredictions extends SearchPaginateType {
  search?: string;
}

export const defaultSearchPrediction: Readonly<ISearchPredictions> = {
  search: "",
  page: 0,
  size: 10,
}

export interface ISearchTickersParam extends SearchPaginateType {
  search?: string;
  ticker?: string;
  type?: string;
  limit?: number;
  sort?: string;
  order?: string;
  market?: string;
}

export const defaultSearchTickersParam: Readonly<ISearchTickersParam> = {
  search: undefined,
  type: undefined,
  ticker: undefined,
  market: undefined,
  sort: undefined,
  order: undefined,
  size: 50,
  page: 0,
};

export interface ITickerClose {
  ticker?: string;
  close?: number;
}
