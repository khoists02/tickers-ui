export interface Pageable {
  sort?: Sortable;
  number: number;
  size: number;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}

export interface Sortable {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface PaginationResponse<T> {
  content: T[];
  pageable: Pageable;
}

export interface IPaginationBaseState {
  pageSize: number;
  sort: string;
  order: string;
  page: number;
}

export const initPageable: Pageable = {
  number: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
  numberOfElements: 0,
};

export const defaultPaginationBaseValue: Readonly<IPaginationBaseState> = {
  pageSize: 10,
  sort: "",
  order: "",
  page: 0,
};

export interface SearchPaginateType {
  page?: number | 0;
  size?: number | 10;
}
