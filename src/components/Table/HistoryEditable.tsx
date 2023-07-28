/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-key */
import React, { FC, CSSProperties, useState } from "react";
import * as uuid from "uuid";
import { Resizable } from "react-resizable";
import { ColDateTimeView } from "./Fields/ColDateTimeView";
import { ColInputNumberView } from "./Fields/ColInputNumberView";
import { IFilterResponse } from "../../types/filter";

interface IHistoryEditable {
  data: IFilterResponse[];
}

export const HistoryEditable: FC<IHistoryEditable> = ({ data }) => {
  const headerCols = [
    {
      id: uuid.v4(),
      label: "Start Date",
      show: true,
      width: 150,
      type: "dateTime",
      field: "startDate",
    },
    {
      id: uuid.v4(),
      label: "End Date",
      show: true,
      width: 150,
      type: "dateTime",
      field: "endDate",
    },
    {
      id: uuid.v4(),
      label: "Steps",
      show: true,
      width: 150,
      type: "number",
      field: "steps",
    },
    {
      id: uuid.v4(),
      label: "Scale",
      show: true,
      width: 150,
      type: "boolean",
      field: "scale",
    },
    {
      id: uuid.v4(),
      label: "Test Size",
      show: true,
      width: 150,
      type: "number",
      field: "testSize",
    },
    {
      id: uuid.v4(),
      label: "Look Steps",
      show: true,
      width: 150,
      type: "number",
      field: "lookStep",
    },
    {
      id: uuid.v4(),
      label: "Epochs",
      show: false,
      width: 150,
      type: "number",
      field: "epochs",
    },
    {
      id: uuid.v4(),
      label: "Shuffle",
      show: true,
      width: 80,
      type: "boolean",
      field: "shuffle",
    },
    {
      id: uuid.v4(),
      label: "Batch Size",
      show: false,
      width: 150,
      type: "number",
      field: "batchSize",
    },
    {
      id: uuid.v4(),
      label: "Units",
      show: false,
      width: 150,
      type: "number",
      field: "units",
    },
  ];
  const styleTable = (width = 50): CSSProperties => {
    return {
      width,
      flex: `${width} 0 auto`,
      minWidth: 0,
      maxWidth: width,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCellByType = (col: any, value: any): React.ReactElement => {
    switch (col.type) {
      case "dateTime":
        return (
          <ColDateTimeView
            onChange={() => {}}
            value={value}
            name="Name"
            colId={col.id}
            readonly={col.id}
          ></ColDateTimeView>
        );
      case "number":
        return (
          <ColInputNumberView
            readonly={col.id}
            validate={{
              max: 30,
              min: 1,
            }}
            onChange={() => {}}
            value={
              col.field === "testSize" ? parseFloat(value).toFixed(2) : value
            }
            name={col.label}
            colId={col.id}
          />
        );

      case "boolean":
        return value === true ? (
          <i className="fa fa-check text-success" />
        ) : (
          <span></span>
        );

      default:
        return <span>No Value Render</span>;
    }
  };

  return (
    <div style={{ zIndex: 1 }}>
      {/* <div className="box-container">Test</div> */}
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
              <span className="text-bold text-success">Tickers</span>{" "}
              <i className="fa fa-arrow-circle-right cursor-pointer" />{" "}
              {data.length}
              <i className="fa fa-plus cursor-pointer ms-2" />
            </div>
            <div className={`header-table-view d-flex ps-3 pe-3 show`}>
              {initCols.map((col) => {
                return (
                  <Resizable
                    transformScale={10}
                    maxConstraints={[200, 42]}
                    minConstraints={[50, 42]}
                    width={col.width}
                    height={42}
                    onResize={(event, { node, size, handle }) => {
                      const cloneCols = [...initCols];

                      const selected = cloneCols.find((x) => x.id === col.id);

                      if (selected) {
                        col.width = size.width;
                      }

                      setInitCols(cloneCols);
                    }}
                  >
                    <div
                      className={`header-table-th ${col.show ? "show" : ""}`}
                      key={col.id}
                      style={styleTable(col.width)}
                    >
                      <div className="text-overflow p-2">{col.label}</div>
                    </div>
                  </Resizable>
                );
              })}
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
            {data.map((d) => {
              return (
                <div className="items d-flex ps-3 pe-3" key={d.id}>
                  {initCols.map((row) => {
                    return (
                      <div
                        className={`item ${row.show ? "show" : ""} `}
                        style={styleTable(row.width)}
                        key={row.id}
                      >
                        <div className="text-overflow p-2">
                          {/* @ts-ignore */}
                          {renderCellByType(row, d[row.field])}
                        </div>
                      </div>
                    );
                  })}
                  {/* <div
                    className="item show border-r-0"
                    style={styleTable(20)}
                  /> */}
                  <div
                    className="item show border-r-0"
                    style={styleTable(20)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
