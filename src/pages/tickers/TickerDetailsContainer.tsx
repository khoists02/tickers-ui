import React, { type FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../config/store";
import { getTickerDetails } from "./ducks/operators";
import { IRootState } from "../../config/reducers";
import { useSelector } from "react-redux";
import { BlockUI } from "../../components/BlockUI";
import { SvgLogoTicker } from "../../components/SvgLogoTicker";
import { convertToInternationalCurrencySystem } from "../../utils/currency";

const TickerDetailsContainer: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ ticker: string }>();
  const { entity, loading } = useSelector(
    (state: IRootState) => state.tickersReducer
  );
  useEffect(() => {
    dispatch(getTickerDetails(params.ticker));
  }, [dispatch, params]);

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
                        <div className="icon d-flex align-items-center mx-2">
                          <SvgLogoTicker polygonUrl={entity?.logoUrl || ""} />
                        </div>
                        <div>
                          <h5 className="fw-600 text-white mb-0 mt-0">
                            Share Class:{" "}
                            {convertToInternationalCurrencySystem(
                              entity?.shareClassOutstanding?.toString() || ""
                            )}
                          </h5>
                          <p className="text-white-50">Revenue</p>
                          <h5 className="text-white">
                            {convertToInternationalCurrencySystem(
                              entity?.marketCap || ""
                            )}
                            <span className="ms-40">
                              <i className="fa fa-angle-down me-10"></i>
                              <span className="text-white-50">0.03%</span>
                            </span>{" "}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </BlockUI>
  );
};

export default TickerDetailsContainer;
