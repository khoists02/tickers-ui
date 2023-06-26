/* eslint-disable @typescript-eslint/prefer-includes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { FC, useEffect, useState, useCallback } from "react";
import { Card } from "../Card";
import { PaginationClientOpts } from "../../types/generic";

export interface IColumn {
  name: string;
  width?: number;
  id?: string;
}

export interface IEditTableProps {
  title: string;
  subTitle?: string;
  columns: IColumn[];
  data: any[];
  searchLabel?: string;
  isLoadingCol?: boolean;
  primaryKey?: string;
  selectedValue?: string;
  newCols?: string[]; // add new cols define data
}

enum ACTIONS {
  LOADING = "loading",
}

const loadingCol: IColumn = {
  id: "loading",
  name: "",
};

const CLIENT_DEFAULT_OPT = 100;

export const EditTable: FC<IEditTableProps> = ({
  title,
  subTitle,
  data = [],
  columns = [],
  searchLabel = "",
  isLoadingCol,
  primaryKey = "id",
  selectedValue,
  newCols = [],
}) => {
  const [searchKey, setSearchKey] = useState("");
  const [filters, setFilters] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState(CLIENT_DEFAULT_OPT);
  const [cols, setCols] = useState<IColumn[]>(columns);

  useEffect(() => {
    let result = columns;
    if (columns.length > 0 && isLoadingCol) {
      result = [...columns, loadingCol];
    }
    setCols(result);
  }, [columns, isLoadingCol]);

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

  const renderTdAction = useCallback(
    (idAction: string, loading = false, index: number): React.ReactElement => {
      let content = <td style={{ width: 50 }}></td>;
      switch (idAction) {
        case ACTIONS.LOADING: {
          if (filters[index][newCols[0]?.toLowerCase()] && !loading) {
            content = (
              <td style={{ width: 50 }}>
                <i className="fa fa-check-square text-success"></i>
              </td>
            );
            break;
          }
          content = !loading ? (
            <td style={{ width: 50 }}></td>
          ) : (
            <td style={{ width: 50 }} className="flex-center">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              />
            </td>
          );
          break;
        }
        default:
          break;
      }
      return content;
    },
    [filters, newCols]
  );

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
                      value={
                        PaginationClientOpts.find(
                          (x) => x.value === selectedOption
                        )?.value || CLIENT_DEFAULT_OPT
                      }
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
                      {cols.map((col) => {
                        return !col.id ? (
                          <th
                            style={{
                              boxSizing: "border-box",
                              position: "relative",
                              width: col.width || 170,
                              minWidth: 0,
                              flex: `${col.width || 170} 0 auto`,
                            }}
                          >
                            {col.name}
                          </th>
                        ) : (
                          <th
                            style={{
                              boxSizing: "border-box",
                              position: "relative",
                              width: 50,
                              minWidth: 0,
                              flex: `${50} 0 auto`,
                            }}
                          ></th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {filters.map((dt, index) => {
                      return (
                        <tr className="old" key={new Date().getTime() + index}>
                          {cols.map((col) => {
                            return !col.id ? (
                              <td
                                style={{
                                  boxSizing: "border-box",
                                  position: "relative",
                                  width: col.width || 170,
                                  minWidth: 0,
                                  flex: `${col.width || 170} 0 auto`,
                                }}
                              >
                                {dt[col.name.toLowerCase()]}
                              </td>
                            ) : (
                              renderTdAction(
                                col.id,
                                dt[primaryKey] === selectedValue,
                                index
                              )
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
