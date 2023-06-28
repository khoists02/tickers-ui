/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FunctionComponent } from "react";
import { TickersFilter } from "./Filter";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { BlockUI } from "../../components/BlockUI";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";

const TickersContainer: FunctionComponent = () => {
  const navigate = useNavigate();
  const { entities, loading } = useSelector(
    (state: IRootState) => state.tickersReducer
  );

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-12">
          <TickersFilter onFilter={() => {}} />
        </div>

        <BlockUI loading={loading}>
          <div className="row">
            {entities.map((entity) => {
              return (
                <div
                  key={entity.tickerDetails?.name}
                  className="col-lg-4 col-12 cursor-pointer"
                  onClick={() => {
                    navigate(`/Tickers/${entity.tickerDetails?.id || ""}`);
                  }}
                >
                  <div
                    className={`box no-shadow no-border ${
                      entity.tickerDetails?.active ? "bg-lightest" : "bg-danger"
                    }`}
                  >
                    <div className="box-body">
                      <h4
                        className="fw-600 text-primary text-overflow"
                        title={entity.tickerDetails?.name}
                      >
                        {entity.tickerDetails?.name}
                      </h4>
                      <p className="badge badge-Light mb-0">This Week</p>
                      <p className="text-success mb-0">
                        <i className="fa fa-arrow-up"></i>{" "}
                        {entity.tickerDetails?.ticker} -{" "}
                        {entity.tickerDetails?.type}
                      </p>
                      <p className="text-success mb-0">
                        <i className="fa fa-money"></i>{" "}
                        {entity.tickerDetails?.currencyName?.toUpperCase()}
                      </p>

                      <p className="text-success mb-0">
                        <i className="fa fa-calendar"></i>{" "}
                        {formatDate(entity.lastUpdated || "")}
                      </p>
                      {entity.tickerDetails?.primaryExchange && (
                        <p className="badge badge-primary mb-0">
                          <i className="fa fa-exchange"></i>{" "}
                          {entity.tickerDetails?.primaryExchange}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="col-md-12">
              {entities?.length === 0 && <span>No Results</span>}
            </div>
          </div>
        </BlockUI>
      </div>
    </>
  );
};

export default TickersContainer;
