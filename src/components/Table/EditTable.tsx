/* eslint-disable @typescript-eslint/prefer-includes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { FC, useEffect, useState } from "react";
import { Card } from "../Card";
import { PaginationClientOpts } from "../../types/generic";

export interface IColumn {
  name: string;
  width?: number;
}

export interface IEditTableProps {
  title: string;
  subTitle?: string;
  columns: IColumn[];
  data: any[];
  searchLabel?: string;
  editable?: boolean;
}

export const EditTable: FC<IEditTableProps> = ({
  title,
  subTitle,
  data = [],
  columns = [],
  searchLabel = "",
  editable = false,
}) => {
  const [searchKey, setSearchKey] = useState("");
  const [filters, setFilters] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState(10);

  useEffect(() => {
    if (data.length) {
      let result = [];
      if (searchLabel) {
        result = data
          .slice(0, selectedOption)
          .filter((x) => (x[searchLabel] as string)?.indexOf(searchKey) > -1);
      } else {
        result = data.slice(0, selectedOption);
      }
      setFilters(result);
    }
  }, [selectedOption, data, searchKey, searchLabel]);

  return (
    <>
      <Card title={title} subTitle={subTitle}>
        <div className="table-responsive">
          <div className="dataTables_wrapper container-fluid dt-bootstrap4">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="dataTables_length" id="example1_length">
                  <label className="d-flex align-items-center">
                    <span>Show</span>
                    <select
                      onChange={(e) => {
                        setSelectedOption(parseInt(e.target.value, 10));
                      }}
                      name="example1_length"
                      className="form-select form-control-sm mx-2"
                    >
                      {PaginationClientOpts.map((p) => {
                        return <option key={p.value}>{p.label}</option>;
                      })}
                    </select>
                    entries
                  </label>
                </div>
              </div>
              {searchLabel && (
                <div className="col-sm-12 col-md-6">
                  <div id="example1_filter" className="dataTables_filter">
                    <label className="d-flex align-items-center">
                      Search:
                      <input
                        onChange={(e) => {
                          setSearchKey(e.target.value);
                        }}
                        value={searchKey}
                        type="search"
                        className="form-control form-control-sm mx-2"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="row mt-2">
              <div className="col-md-12">
                <table className="table table-bordered table-separated dataTable">
                  <thead>
                    <tr role="row">
                      {columns.map((col) => {
                        return (
                          <th style={{ width: col.width || 170 }}>
                            {col.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {filters.map((dt, index) => {
                      return (
                        <tr className="old" key={new Date().getTime() + index}>
                          {columns.map((col) => {
                            return (
                              <td style={{ width: col.width || 170 }}>
                                {dt[col.name]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    {filters.length === 0 && (
                      <tr className="p-2">No Results </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Rows */}
          </div>
        </div>
      </Card>
    </>
  );
};
