
import React, { FC, useCallback, useEffect, useState } from "react";
import { SearchPaginateType } from "../../types/generic";

type SearchPaginate = (search: SearchPaginateType) => void;

export interface FooterData {
  offset: number;
  numberOfElements: number;
  totalElements?: number;
  first: boolean;
  last: boolean;
  searchPage: SearchPaginate;
  pageNumber: number;
  loading?: boolean;
}

export const TableFooter: FC<FooterData> = ({
  offset,
  numberOfElements,
  totalElements,
  first,
  last,
  searchPage,
  pageNumber,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);

  const goToNext = useCallback(() => {
    setCurrentPage(pageNumber + 1);
    searchPage({ page: pageNumber + 1 });
  }, [pageNumber, searchPage]);

  const goToPrev = useCallback(() => {
    setCurrentPage(pageNumber - 1);
    searchPage({ page: pageNumber - 1 });
  }, [pageNumber, searchPage]);

  useEffect(() => {
    if (
      currentPage >= pageNumber &&
      numberOfElements === 0 &&
      last &&
      !first &&
      !loading
    ) {
      goToPrev();
    }
  }, [
    goToPrev,
    last,
    numberOfElements,
    currentPage,
    pageNumber,
    loading,
    first,
  ]);

  return (
    <div className="dataTables_wrapper ">
      <div className="dataTables_paginate paging_simple_numbers d-flex align-items-center">
        <span>
          {totalElements
            ? `Showing ${totalElements > 0 ? offset + 1 : 0} to ${offset + numberOfElements || 0
            } of ${totalElements}`
            : `Showing ${numberOfElements > 0 ? offset + 1 : 0} to ${offset + numberOfElements || 0
            }`}
        </span>
        <ul className="pagination mb-0 pb-0 ml-2">
          <li
            className={`paginate_button page-item previous cursor-pointer ${first ? "disabled" : ""
              }`}
          >
            <a
              type="button"
              onClick={goToPrev}
              className="page-link cursor-pointer btn-fixed-w"
            >
              ← &nbsp; Previous
            </a>
          </li>
          <li
            className={`paginate_button page-item next cursor-pointer ${last ? "disabled" : ""
              }`}
          >
            <a
              type="button"
              className="page-link cursor-pointer btn-fixed-w"
              onClick={goToNext}
            >
              Next &nbsp; →
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
