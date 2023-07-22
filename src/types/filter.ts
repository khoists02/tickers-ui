import { SearchPaginateType } from "./generic";

export interface IFilterResponse {
  id?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
}

export interface ISearchFilter extends SearchPaginateType {
  search?: string;
  mode?: string;
}

export const defaultSearchFilter: Readonly<ISearchFilter> = {
  search: "",
  page: 0,
  size: 10,
}
