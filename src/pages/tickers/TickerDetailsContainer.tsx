/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {
  type FC,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../config/store";
import {
  getTickerDetails,
  getStockDataByTicker,
  getTickersBySics,
} from "./ducks/operators";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { BlockUI } from "../../components/BlockUI";
import { EditTable, IColumn } from "../../components/Table/EditTable";
import { Card } from "../../components/Card";
import axios from "axios";
import { formatDate } from "../../utils/date";
import { ITickerClose } from "../../types/tickers";
import { getCsrfToken } from "../auth/ducks/opertators";

const intervalSeconds = 12; // 5 times
const initialCols = [
  {
    name: "date",
  },
  {
    name: "open",
  },
  {
    name: "close",
  },
  {
    name: "low",
  },
  {
    name: "volume",
  },
  {
    name: "higher",
    width: 50,
  },
];

const TickerDetailsContainer: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ ticker: string }>();
  const { entity, loading, stocks, tickers, updatedUUId } = useSelector(
    (state: IRootState) => state.tickersReducer
  );
  const { token } = useSelector((state: IRootState) => state.authReducer);
  const intervalIdRef = useRef<NodeJS.Timeout>();
  const [count, setCount] = useState(-1);
  const [filteredStocks, setFilteredStocks] = useState<any[]>(stocks);
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [sics, setSics] = useState<string[]>([]);
  const [cols, setCols] = useState<IColumn[]>(initialCols);
  const [selectedDate, setSelectedDate] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    if (!token) dispatch(getCsrfToken());
  }, [dispatch, token]);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    dispatch(getTickerDetails(params.ticker));
  }, [dispatch, params]);

  useEffect(() => {
    if (entity?.ticker) dispatch(getStockDataByTicker(entity?.ticker));
    if (entity?.sicDescription) {
      setSics(entity.sicDescription.split(",").map((x) => x.toUpperCase()));
    }
  }, [dispatch, entity]);

  useEffect(() => {
    if (sics.length > 0) dispatch(getTickersBySics(sics));
  }, [dispatch, sics]);

  useEffect(() => {
    setFilteredStocks(stocks);
  }, [stocks]);

  const handleInsertCols = useCallback((tickersSelected: string[]) => {
    if (tickersSelected.length === 0) setCols(initialCols);
    if (tickersSelected.length > 0) {
      let cloneCols = [...initialCols];
      tickersSelected.forEach((t) => {
        const newCol: IColumn = {
          name: t,
        };
        cloneCols = [newCol, ...cloneCols];
      });
      setCols(cloneCols);
    }
  }, []);

  const timeCount = useMemo(() => {
    return (
      intervalSeconds *
      (selectedTickers.length !== 0 ? selectedTickers.length : 1)
    );
  }, [selectedTickers]);

  useEffect(() => {
    if (!trigger) {
      setSelectedDate("");
      clearInterval(intervalIdRef.current);
      return;
    }
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    if (intervalSeconds > 0) {
      if (count < 0) setSelectedDate(stocks[0].date as string); // trigger loading...

      intervalIdRef.current = setInterval(async () => {
        let rqParams = {};
        if (selectedTickers.length) {
          rqParams = {
            ...rqParams,
            tickers: selectedTickers.toString(),
          };
        }
        if (count === -1) {
          setSelectedDate((stocks[count + 1]?.date as string) || "");
        }

        let formatDateParams;
        if (stocks[count + 1]?.date) {
          formatDateParams = formatDate(
            stocks[count + 1].date as string,
            "yyyy-MM-dd"
          );
        } else {
          setTrigger(false);
          clearInterval(intervalIdRef.current);
          // clearInterval(subInterval);
          setCount(0);
          return;
        }

        if (formatDateParams) {
          rqParams = { ...rqParams, date: formatDateParams };
        }
        if (count < stocks.length) {
          try {
            const response = await axios.get(`/stocks/tickers`, {
              params: rqParams,
            });
            if (response.data.content) {
              const closes: ITickerClose[] = response.data.content;

              const cloneFiltered = [...filteredStocks];
              let selectedFiltered: any = stocks.find(
                (x) => x.date === (stocks[count + 1].date as string)
              );
              closes.forEach((cl) => {
                selectedFiltered = {
                  [cl.ticker?.toLowerCase() as string]: cl.close,
                  ...selectedFiltered,
                };
              });
              cloneFiltered[count + 1] = selectedFiltered;
              setFilteredStocks(cloneFiltered);
            }
            setSelectedDate((stocks[count + 2]?.date as string) || ""); // avoid case null
            setCount(count + 1);
          } catch (error) {
            setCount(count + 1);
          }
        } else {
          clearInterval(intervalIdRef.current);
          setTrigger(false);
        }
      }, timeCount * 1000);
    }
  }, [
    count,
    filteredStocks,
    selectedDate,
    selectedTickers,
    stocks,
    timeCount,
    trigger,
  ]);

  const runJobs = () => {
    setTrigger(!trigger);
  };

  return (
    <BlockUI loading={loading}>
      <>
        <div className="row">
          <div className="col-lg-12">
            <div className="box bg-gradient-primary">
              <div className="box-body">
                <div className="row">
                  <div className="col-xl-6 col-12">
                    <h3 className="text-white mb-50">
                      Revenue Overview - {entity?.name}{" "}
                    </h3>
                    <div className="d-flex justify-content-between align-items-end">
                      <div className="d-flex">
                        {/* <div className="icon d-flex align-items-center mx-2">
                          <SvgLogoTicker polygonUrl={entity?.logoUrl || ""} />
                        </div> */}
                        <div>
                          {/* <h5 className="fw-600 text-white mb-0 mt-0">
                            Share Class:{" "}
                            {convertToInternationalCurrencySystem(
                              entity?.shareClassOutstanding?.toString() || ""
                            )}
                          </h5> */}
                          <p className="text-white-50">Revenue</p>
                          {/* <h5 className="text-white">
                            {convertToInternationalCurrencySystem(
                              entity?.marketCap || ""
                            )}
                            <span className="ms-40">
                              <i className="fa fa-angle-down me-10"></i>
                              <span className="text-white-50">0.03%</span>
                            </span>{" "}
                          </h5> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-12"></div>
                </div>

                <div>
                  {sics.map((sic, index) => {
                    return (
                      <span
                        key={sic}
                        className={`badge badge-success mx-1 ${
                          index === 0 ? "ml-0" : ""
                        }`}
                      >
                        {sic}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <Card
              widthTile={300}
              title="Filter By Sic Description"
              subTitle="Search new value fields relative"
            >
              <>
                <div className="">
                  {tickers
                    .filter((x) => x !== entity?.ticker)
                    .map((t, i) => {
                      return (
                        <div
                          className={`badge badge-${
                            selectedTickers.includes(t)
                              ? "primary"
                              : "secondary"
                          } ${i === 0 ? "" : "mx-1"} p-2 cursor-pointer`}
                          key={t}
                          onClick={() => {
                            let clone = [...selectedTickers];
                            if (!selectedTickers.includes(t)) {
                              clone.push(t);
                            } else {
                              clone = clone.filter((x) => x !== t);
                            }
                            setSelectedTickers(clone);
                          }}
                        >
                          {t}
                        </div>
                      );
                    })}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      handleInsertCols(selectedTickers);
                    }}
                    disabled={selectedTickers?.length === 0}
                    className="mt-3 waves-effect waves-light btn btn-primary-light"
                  >
                    Import Cols
                  </button>
                  <button
                    disabled={cols.length <= 6}
                    type="button"
                    onClick={() => {
                      runJobs();
                    }}
                    className="mx-2 mt-3 waves-effect waves-light btn btn-primary-light"
                  >
                    {trigger ? "Stop" : "Run"} Jobs
                  </button>

                  <button
                    type="button"
                    disabled={selectedTickers.length === 0}
                    onClick={() => {
                      setSelectedTickers([]);
                      handleInsertCols([]);
                    }}
                    className="mx-2 mt-3 waves-effect waves-light btn btn-primary-light"
                  >
                    Clear Selected Cols
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      axios.defaults.headers.common["X-XSRF-TOKEN"] = token;
                      await axios.put(`/stocks/tickers/${updatedUUId}`, {
                        json: JSON.stringify(filteredStocks),
                      });
                    }}
                    className="mx-2 mt-3 waves-effect waves-light btn btn-primary-light"
                  >
                    Import Data
                  </button>

                  <button
                    type="button"
                    className="mx-2 mt-3 waves-effect waves-light btn btn-primary-light"
                  >
                    Predictions
                  </button>
                </div>
              </>
            </Card>
          </div>

          <div className="col-lg-12">
            <EditTable
              columns={cols}
              data={filteredStocks}
              title="Training Data"
              isLoadingCol={cols.length > 6}
              primaryKey="date"
              selectedValue={selectedDate}
              newCols={selectedTickers}
              subTitle={subTitle}
            />
          </div>
        </div>
      </>
    </BlockUI>
  );
};

export default TickerDetailsContainer;
