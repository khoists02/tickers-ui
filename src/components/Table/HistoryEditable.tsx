import React, { FC, CSSProperties, useState } from "react";
import * as uuid from "uuid";

export const HistoryEditable: FC = () => {
  const headerCols = [
    {
      id: uuid.v4(),
      label: "Start Date",
      show: true,
      width: 150,
    },
    {
      id: uuid.v4(),
      label: "End Date",
      show: true,
      width: 150,
    },
    {
      id: uuid.v4(),
      label: "Steps",
      show: true,
      width: 80,
    },
    {
      id: uuid.v4(),
      label: "Scale",
      show: true,
      width: 80,
    },
    {
      label: "Test Size",
      show: true,
      width: 80,
    },
    {
      id: uuid.v4(),
      label: "Look Steps",
      show: true,
      width: 80,
    },
    {
      id: uuid.v4(),
      label: "Epochs",
      show: false,
      width: 80,
    },
    {
      id: uuid.v4(),
      label: "Batch Size",
      show: false,
      width: 80,
    },
    {
      id: uuid.v4(),
      label: "Units",
      show: false,
      width: 80,
    },
  ];
  const styleTable = (width = 50): CSSProperties => {
    return {
      width,
      flex: `${width} 0 auto`,
      minWidth: 0,
    };
  };
  const [initCols, setInitCols] = useState(headerCols);
  const [showFilter, setShowFilter] = useState(false);
  const handleUpdateCols = (colId: string): void => {
    const cloneCols = [...initCols];

    const col = cloneCols.find((x) => x.id === colId);

    if (col) {
      col.show = !col.show;
    }

    setInitCols(cloneCols);
  };
  return (
    <div style={{ zIndex: 1 }}>
      <div
        className=""
        style={{ position: "sticky", height: 0, left: 0, zIndex: 100 }}
      >
        <div className={`filters ${showFilter ? "show" : ""}`}>
          <div className="filter-headers d-flex justify-content-end pe-2 cursor-pointer">
            <i
              onClick={() => {
                setShowFilter(false);
              }}
              className="fa fa-close"
            ></i>
          </div>
          {initCols.map((col) => {
            return (
              <div
                className="filter-item p-2 d-flex justify-content-between align-items-center"
                key={col.id}
              >
                <span> {col.label}</span>
                <i
                  onClick={() => {
                    handleUpdateCols(col.id || "");
                  }}
                  className={`fa fa-eye${
                    col.show ? "" : "-slash"
                  } cursor-pointer`}
                ></i>
              </div>
            );
          })}
        </div>
      </div>
      <div className="history-wrapper p-3">
        <div className="collection-group">
          <div className="group-item mb-3">
            <div className="name cursor-pointer">
              Tickers <i className="fa fa-arrow-circle-right cursor-pointer" />
            </div>
            <div className={`header-table-view d-flex ps-3 pe-3 show`}>
              {initCols.map((col) => {
                return (
                  <div
                    className={`header-table-th ${col.show ? "show" : ""}`}
                    key={col.id}
                    style={styleTable(col.width)}
                  >
                    <div className="text-overflow p-2">{col.label}</div>
                  </div>
                );
              })}
              <div
                className="header-table-th show cursor-pointer"
                style={styleTable(20)}
              >
                <div className="text-overflow p-2 flexbox">
                  <i className="fa fa-plus"></i>
                </div>
              </div>
              <div
                className="header-table-th show cursor-pointer"
                style={styleTable(20)}
              >
                <div
                  className="text-overflow p-2 flexbox"
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                >
                  <i className="fa fa-ellipsis-h" />
                </div>
              </div>
            </div>
            <div className="items d-flex ps-3 pe-3">
              {initCols.map((row) => {
                return (
                  <div
                    className={`item ${row.show ? "show" : ""} `}
                    style={styleTable(row.width)}
                    key={row.id}
                  >
                    <div className="text-overflow p-2">{row.label}</div>
                  </div>
                );
              })}
              <div className="item show" style={styleTable(20)} />
              <div className="item show" style={styleTable(20)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
