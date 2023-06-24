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

export const PaginationClientOpts = [
  {
    label: 10,
    value: 10,
  },
  {
    label: 50,
    value: 50,
  },
  {
    label: 100,
    value: 100,
  },
  {
    label: 200,
    value: 200,
  },
  {
    label: 300,
    value: 300,
  },
];
