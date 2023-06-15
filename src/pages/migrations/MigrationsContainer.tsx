/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "../../config/reducers";
import { useAppDispatch } from "../../config/store";
import { getCsrfToken } from "../auth/ducks/opertators";
import { ProgressBar } from "react-bootstrap";

interface IStockResponse {
  id?: string;
  ticker?: string;
}

const MigrationsContainer: FC = () => {
  const dispatch = useAppDispatch();
  const intervalIdRef = useRef<NodeJS.Timeout>();
  const [count, setCount] = useState(0);
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

  const [tickersSuccess, setTickersSuccess] = useState<string[]>([]);

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
              const response = await axios.post(
                `/tickers/${tickers[count - 1].ticker as string}`
              );
              setTickersSuccess([...tickersSuccess, response.data]);
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
  }, [
    dispatch,
    intervalSeconds,
    tickers,
    count,
    token,
    timeCount,
    tickersSuccess,
  ]);

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-10 mt-1 ">
              <ProgressBar now={(timeCount / 10) * 100} />
            </div>
            <div className="col-lg-2 ">
              <span className="px-2">{(timeCount / 10) * 100} %</span>
              <div className="spinner-border spinner-border-sm" role="status" />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          {tickersSuccess.map((t) => {
            return (
              <p className="animated bounceInLeft" key={t}>
                {t}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MigrationsContainer;
