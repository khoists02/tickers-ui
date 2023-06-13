/* eslint-disable @typescript-eslint/dot-notation */
import React, { FunctionComponent } from "react";
import { TickersFilter } from "./Filter";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { BlockUI } from "../../components/BlockUI";
import { useAppDispatch } from "../../config/store";
import { getTickersPagination } from "./ducks/operators";
import { formatDate } from "../../utils/date";

const TickersContainer: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { entities, loading, pagination } = useSelector(
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
            <div className="col-lg-12">
              <ul className="pagination">
                <li
                  className="paginate_button page-item next"
                  id="example6_previous"
                >
                  {" "}
                  {pagination.nextPage && (
                    <a
                      onClick={() => {
                        dispatch(getTickersPagination(pagination.cursor));
                      }}
                      className="page-link"
                    >
                      Next
                    </a>
                  )}
                  {entities.length > 0 && <a>{pagination.count}</a>}
                </li>
              </ul>
            </div>
            {entities.map((entity) => {
              return (
                <div
                  key={entity.name}
                  className="col-lg-4 col-12 cursor-pointer"
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
                      <p className="text-mute mb-0">This Week</p>
                      <p className="text-success mb-0">
                        <i className="fa fa-arrow-up"></i> {entity.ticker} -{" "}
                        {entity.type}
                      </p>
                      <p className="text-success mb-0">
                        <i className="fa fa-money"></i> {entity.currencyName}
                      </p>

                      <p className="text-success mb-0">
                        <i className="fa fa-calendar"></i>{" "}
                        {formatDate(entity.lastUpdated || "")}
                      </p>
                      {entity.primaryExchange && (
                        <p className="text-success mb-0">
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
