import React, { type FC, useEffect, useState } from "react";
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

const TickerDetailsContainer: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ ticker: string }>();
  const { entity, loading, stocks, tickers } = useSelector(
    (state: IRootState) => state.tickersReducer
  );
  // const [filterSearchKey, setFilterSearchKey] = useState("");
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [sics, setSics] = useState<string[]>([]);

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

  const cols: IColumn[] = [
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
    },
  ];

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
                    .filter((x) => x !== params.ticker)
                    .map((t) => {
                      return (
                        <div
                          className={`badge badge-${
                            selectedTickers.includes(t)
                              ? "primary"
                              : "secondary"
                          } mx-1 p-2 cursor-pointer`}
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
                <button
                  type="button"
                  disabled={selectedTickers?.length === 0}
                  className="mt-3 waves-effect waves-light btn btn-primary-light"
                >
                  Filter
                </button>
              </>
            </Card>
          </div>

          <div className="col-lg-12">
            <EditTable columns={cols} data={stocks} title="Training Data" />
          </div>
        </div>
      </>
    </BlockUI>
  );
};

export default TickerDetailsContainer;
