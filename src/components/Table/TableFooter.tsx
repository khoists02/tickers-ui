/*
 * AdvaHealth Solutions Pty. Ltd. ("AHS") CONFIDENTIAL
 * Copyright (c) 2022 AdvaHealth Solutions Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of AHS. The intellectual and technical concepts contained
 * herein are proprietary to AHS and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from AHS.  Access to the source code contained herein is hereby forbidden to anyone except current AHS employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 *
 * The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code, which includes
 * information that is confidential and/or proprietary, and is a trade secret, of AHS. ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE,
 * OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS  SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
 * LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT CONVEY OR IMPLY ANY RIGHTS
 * TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
 */

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
            ? `Showing ${totalElements > 0 ? offset + 1 : 0} to ${
                offset + numberOfElements || 0
              } of ${totalElements}`
            : `Showing ${numberOfElements > 0 ? offset + 1 : 0} to ${
                offset + numberOfElements || 0
              }`}
        </span>
        <ul className="pagination mb-0 pb-0 ml-2">
          <li
            className={`paginate_button page-item previous cursor-pointer ${
              first ? "disabled" : ""
            }`}
          >
            <a
              type="button"
              onClick={goToPrev}
              className="page-link cursor-pointer"
            >
              ← &nbsp; Previous
            </a>
          </li>
          <li
            className={`paginate_button page-item next cursor-pointer ${
              last ? "disabled" : ""
            }`}
          >
            <a
              type="button"
              className="page-link cursor-pointer"
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
