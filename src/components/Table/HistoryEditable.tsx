/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-key */
import React, { FC, CSSProperties, useState, useEffect, useRef } from "react";
import { Resizable } from "react-resizable";
import { ColDateTimeView } from "./Fields/ColDateTimeView";
import { ColInputNumberView } from "./Fields/ColInputNumberView";
import {
  IFilterResponse,
  defaultFilterHistory,
  headerCols,
} from "../../types/filter";
import { BoxContainer } from "./BoxContainer";

interface IHistoryEditable {
  data: IFilterResponse[];
}

export const HistoryEditable: FC<IHistoryEditable> = ({ data }) => {
  const filterRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState("");
  const [showBoxContainer, setShowBoxContainer] = useState(false);
  const [histories, setHistories] = useState<IFilterResponse[]>([]);
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
  const [subs, setSubs] = useState<Array<{ id: string; open: boolean }>>([]);
  useEffect(() => {
    setHistories(data);
  }, [data]);

  const handleUpdateCols = (colId: string): void => {
    const cloneCols = [...initCols];

    const col = cloneCols.find((x) => x.id === colId);

    if (col) {
      col.show = !col.show;
    }

    setInitCols(cloneCols);
  };

  const renderCellByType = (
    col: any,
    value: any,
    readonly = false
  ): React.ReactElement => {
    switch (col.type) {
      case "dateTime":
        return (
          <ColDateTimeView
            onChange={() => {}}
            value={value}
            name="Name"
            colId={col.id}
            readonly={readonly}
          ></ColDateTimeView>
        );
      case "number":
        return (
          <ColInputNumberView
            readonly={readonly}
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
          <i className="fa fa-check " />
        );

      default:
        return <span>No Value Render</span>;
    }
  };

  const handelAddDefaultRow = (): void => {
    setHistories([...histories, defaultFilterHistory]);
  };

  useEffect(() => {
    if (histories.length > 0) {
      setSubs(
        histories.map((x) => {
          return {
            id: x.id as string,
            open: false,
          };
        })
      );
    }
  }, [histories]);

  const handleOpenSub = (id: string): void => {
    const clone = [...subs];

    const selected = clone.find((x) => x.id === id);

    if (selected) {
      selected.open = !selected.open;
    }

    setSubs(clone);
  };

  const handleClickOutside = (event: any): void => {
    if (filterRef?.current && !filterRef.current?.contains(event.target)) {
      setShowFilter(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRef]);

  return (
    <div style={{ zIndex: 1 }}>
      {showBoxContainer && (
        <BoxContainer
          id={selectedId}
          onClose={() => {
            setSelectedId("");
            setShowBoxContainer(false);
          }}
        />
      )}
      <div
        className=""
        style={{ position: "sticky", height: 0, left: 0, zIndex: 100 }}
      >
        <div
          className={`filters ${showFilter ? "show" : ""}`}
          ref={filterRef as any}
        >
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
              <i
                className="fa fa-plus cursor-pointer ms-2"
                onClick={handelAddDefaultRow}
              />
            </div>
            <div className={`header-table-view d-flex ps-3 pe-3 show`}>
              <div
                className="header-table-th show cursor-pointer"
                style={styleTable(50)}
              ></div>
              {initCols.map((col) => {
                return (
                  <Resizable
                    transformScale={10}
                    maxConstraints={[500, 42]}
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
                style={styleTable(50)}
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
              <div
                className="header-table-th show cursor-pointer"
                style={styleTable(50)}
              />
            </div>
            {histories.map((d) => {
              return (
                <>
                  <div className="items d-flex ps-3 pe-3" key={d.id}>
                    <div
                      className="item show d-flex align-items-center"
                      style={styleTable(50)}
                    >
                      <i
                        className="fa fa-arrow-circle-right cursor-pointer"
                        onClick={() => {
                          handleOpenSub(d.id as string);
                        }}
                      ></i>
                    </div>
                    {initCols.map((row) => {
                      return (
                        <div
                          className={`item ${row.show ? "show" : ""} `}
                          style={styleTable(row.width)}
                          key={row.id}
                        >
                          <div className="text-overflow p-2">
                            {/* @ts-ignore */}
                            {renderCellByType(row, d[row.field], d.id !== "")}
                          </div>
                        </div>
                      );
                    })}
                    <div className="item show " style={styleTable(50)} />
                    <div
                      className="item show d-flex align-items-center justify-content-center"
                      style={styleTable(50)}
                    >
                      <i
                        onClick={() => {
                          setSelectedId(d.id || "");
                          setShowBoxContainer(true);
                        }}
                        className="fa fa-folder-open cursor-pointer"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                  {subs.find((x) => x.id === d.id)?.open && (
                    <div className="sub p-3">
                      <div>SUB</div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
