/* eslint-disable @typescript-eslint/dot-notation */
import React, { FunctionComponent } from "react";
import { TickersFilter } from "./Filter";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { BlockUI } from "../../components/BlockUI";

const TickersContainer: FunctionComponent = () => {
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
                <div key={entity["name"]} className="col-lg-4 col-12">
                  <div className="box no-shadow no-border bg-lightest">
                    <div className="box-body">
                      <h2
                        className="fw-600 text-primary text-overflow"
                        title={entity["name"]}
                      >
                        {entity["name"]}
                      </h2>
                      <p className="text-mute mb-0">This Week</p>
                      <p className="text-success mb-0">
                        <i className="fa fa-arrow-up"></i> {entity["ticker"]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </BlockUI>
      </div>
    </>
  );
};

export default TickersContainer;
