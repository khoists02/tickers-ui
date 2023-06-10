import React, { FunctionComponent } from "react";
import { TickersFilter } from "./Filter";

const TickersContainer: FunctionComponent = () => {
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-12">
          <TickersFilter onFilter={() => {}} />
        </div>
      </div>
    </>
  );
};

export default TickersContainer;
