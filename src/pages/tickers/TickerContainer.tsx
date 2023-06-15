/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import { TickersFilter } from "./Filter";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { BlockUI } from "../../components/BlockUI";
import { useAppDispatch } from "../../config/store";
import { getTickersPagination } from "./ducks/operators";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCsrfToken } from "../auth/ducks/opertators";

interface IStockResponse {
  id?: string;
  ticker?: string;
}

const TickersContainer: FunctionComponent = () => {
  const intervalIdRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);
  const { entities, loading, pagination } = useSelector(
    (state: IRootState) => state.tickersReducer
  );
  const { token } = useSelector((state: IRootState) => state.authReducer);
  const [tickers, setTickers] = useState<IStockResponse[]>([]);
  useEffect(() => {
    setCount(tickers.length);
  }, [tickers]);
  useEffect(() => {
    const getTickers = async () => {
      const response = await axios.get("/stocks?type=CS");
      const result: IStockResponse[] = response.data["tickers"];
      setTickers(result);
    };
    getTickers();
  }, []);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intervalSeconds = 15; // 5s

  const [timeCount, setTimeCount] = useState(0);

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    if (intervalSeconds > 0) {
      intervalIdRef.current = setInterval(async () => {
        if (timeCount === 10) window.location.reload();
        if (count !== 0) {
          if (token) {
            try {
              axios.defaults.headers.common["X-XSRF-TOKEN"] = token;
              await axios.post(
                `/tickers/${tickers[count - 1].ticker as string}`
              );
              setCount(count - 1);
              setTimeCount(timeCount + 1);
            } catch (error) {
              clearInterval(intervalIdRef.current);
              window.location.reload();
            }
          } else {
            dispatch(getCsrfToken());
          }
        }
      }, intervalSeconds * 1000);
    }
  }, [intervalSeconds, tickers, count, token, timeCount]);
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-12">
          <TickersFilter onFilter={() => {}} />
        </div>

        <BlockUI loading={loading}>
          <div className="row">
            {pagination.nextPage && (
              <div className="col-lg-12">
                <ul className="pagination">
                  <li
                    className="paginate_button page-item next"
                    id="example6_previous"
                    onClick={() => {
                      dispatch(getTickersPagination(pagination.cursor));
                    }}
                  >
                    <a className="page-link">Next</a>
                    <a>{pagination.count}</a>
                  </li>
                </ul>
              </div>
            )}
            {entities.map((entity) => {
              return (
                <div
                  key={entity.name}
                  className="col-lg-4 col-12 cursor-pointer"
                  onClick={() => {
                    navigate(`/Tickers/${entity.ticker || ""}`);
                  }}
                >
                  <div
                    className={`box no-shadow no-border ${
                      entity.active ? "bg-lightest" : "bg-danger"
                    }`}
                  >
                    <div className="box-body">
                      <h4
                        className="fw-600 text-primary text-overflow"
                        title={entity.name}
                      >
                        {entity.name}
                      </h4>
                      <p className="badge badge-Light mb-0">This Week</p>
                      <p className="text-success mb-0">
                        <i className="fa fa-arrow-up"></i> {entity.ticker} -{" "}
                        {entity.type}
                      </p>
                      <p className="text-success mb-0">
                        <i className="fa fa-money"></i>{" "}
                        {entity.currencyName?.toUpperCase()}
                      </p>

                      <p className="text-success mb-0">
                        <i className="fa fa-calendar"></i>{" "}
                        {formatDate(entity.lastUpdated || "")}
                      </p>
                      {entity.primaryExchange && (
                        <p className="badge badge-primary mb-0">
                          <i className="fa fa-exchange"></i>{" "}
                          {entity.primaryExchange}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {entities?.length === 0 && <span>No Results</span>}
          </div>
        </BlockUI>
      </div>
    </>
  );
};

export default TickersContainer;
