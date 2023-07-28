/* eslint-disable react/jsx-key */
import React, { FC, useCallback, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { EditTable, IColumn } from "../../components/Table/EditTable";
import { TableFooter } from "../../components/Table/TableFooter";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { SearchPaginateType } from "../../types/generic";
import { useAppDispatch } from "../../config/store";
import { getFilters } from "./ducks/operations";
import { ISearchFilter, defaultSearchFilter } from "../../types/filter";

const FiltersContainer: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] =
    useState<ISearchFilter>(defaultSearchFilter);
  const [searchKey, setSearchKey] = useState("");
  const { entities, loading, pageable } = useSelector(
    (state: IRootState) => state.filtersReducer
  );
  const initialCols: IColumn[] = [
    {
      name: "name",
      header: "Name",
    },
    {
      name: "startDate",
      header: "Start",
    },
    {
      name: "endDate",
      header: "End",
    },
    {
      id: "actions",
      actions: [
        <i
          className="fa fa-folder-open  px-2 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
          }}
        ></i>,
      ],
    },
  ];
  const fetchData = useCallback(
    (search?: SearchPaginateType) => {
      dispatch(getFilters({ ...search, search: searchKey }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch, searchKey]
  );

  const searchPage = (search: SearchPaginateType): void => {
    setSearchParams({
      ...searchParams,
      ...search,
    });
    fetchData({
      ...searchParams,
      ...search,
    });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-12">
          <Card>
            <div className="row">
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  value={searchKey}
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") fetchData();
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="col-xl-12 col-12">
          <EditTable
            loading={loading}
            columns={initialCols}
            data={entities}
            showOption={false}
            title="Filters"
          />
          <TableFooter
            searchPage={searchPage}
            totalElements={pageable.totalElements}
            offset={pageable.number * pageable.size}
            first={pageable.number === 0}
            last={pageable.number >= pageable.totalElements / pageable.size - 1}
            numberOfElements={pageable.numberOfElements}
            pageNumber={pageable.number}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default FiltersContainer;
