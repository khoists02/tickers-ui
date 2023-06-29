/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-includes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { FC, useEffect, useState, useCallback } from "react";
import { Card } from "../Card";
import { PaginationClientOpts } from "../../types/generic";
import { BlockUI } from "../BlockUI";

export interface IColumn {
  name?: string;
  width?: number;
  header?: string;
  id?: string;
  actions?: React.ReactElement[];
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
  headerActions?: React.ReactElement[];
  showOption?: boolean;
  loading?: boolean;
  selectRow?: (id: string, action: string) => void;
}

enum ACTIONS {
  LOADING = "loading",
  ACTIONS = "actions",
}

const loadingCol: IColumn = {
  id: "loading",
  header: "",
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
  headerActions = [],
  showOption = true,
  loading = false,
  selectRow,
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
    } else {
      setFilters([]);
    }
  }, [selectedOption, data, searchKey, searchLabel]);

  const renderTdAction = useCallback(
    (
      idAction: string,
      loadingCurrentCol = false,
      index: number,
      selectedVal = ""
    ): React.ReactElement | null => {
      let content: React.ReactElement | null = <td style={{ width: 50 }}></td>;
      switch (idAction) {
        case ACTIONS.LOADING: {
          if (filters[index][newCols[0]?.toLowerCase()] && !loadingCurrentCol) {
            content = (
              <td style={{ width: 50 }}>
                <i className="fa fa-check-square text-success"></i>
              </td>
            );
            break;
          }
          content = !loadingCurrentCol ? (
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
        case ACTIONS.ACTIONS: {
          const col = cols.find((x) => x.id === "actions");
          const actions = col?.actions || [];
          if (actions?.length === 0 || !actions) {
            content = null;
            break;
          }
          // @ts-ignore
          content = (
            <td
              style={{
                boxSizing: "border-box",
                position: "relative",
                width: col?.width || 50,
                minWidth: 0,
                flex: `${col?.width || 50} 0 auto`,
              }}
            >
              <div className="text-center w-100">
                {actions.map((action, iAction) => {
                  return (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        if (selectRow) {
                          selectRow(
                            selectedVal,
                            iAction === 0 ? "edit" : "delete"
                          );
                        }
                      }}
                    >
                      {action}
                    </span>
                  );
                })}
              </div>
            </td>
          );
          break;
        }
        default:
          break;
      }
      return content;
    },
    [cols, filters, newCols, selectRow]
  );

  return (
    <>
      <BlockUI loading={loading}>
        <Card headerActions={headerActions} title={title} subTitle={subTitle}>
          <div className="table-responsive">
            <div className="dataTables_wrapper container-fluid dt-bootstrap4">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="dataTables_length" id="example1_length">
                    {showOption && (
                      <>
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
                      </>
                    )}
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
                              {col.header || col.name}
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
                          <tr
                            className="old"
                            key={new Date().getTime() + index}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
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
                                  {dt[col.name as string]}
                                </td>
                              ) : (
                                renderTdAction(
                                  col.id,
                                  dt[primaryKey] === selectedValue,
                                  index,
                                  dt[primaryKey]
                                )
                              );
                            })}
                          </tr>
                        );
                      })}
                      {filters.length === 0 && (
                        <p className="p-2">No Results </p>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Rows */}
            </div>
          </div>
        </Card>
      </BlockUI>
    </>
  );
};
