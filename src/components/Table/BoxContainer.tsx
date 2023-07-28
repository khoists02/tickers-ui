/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../config/store";
import {
  checkExistFilterInHistory,
  getFilterDetails,
  loadHistoryByFilterId,
} from "../../pages/filters/ducks/operations";
import { IRootState } from "../../config/reducers";
import {
  IFilterResponse,
  defaultFilterHistory,
  headerCols,
} from "../../types/filter";
import { Card } from "../Card";

interface IBoxContainer {
  id: string;
  onClose: () => void;
}

export const BoxContainer: FC<IBoxContainer> = ({ id, onClose }) => {
  const dispatch = useAppDispatch();
  const boxRef = useRef<HTMLElement>(null);
  const isNew = id === "";
  const { entity, exits, history } = useSelector(
    (state: IRootState) => state.filtersReducer
  );
  const [selected, setSelected] = useState<IFilterResponse | null>(null);
  const handleClickOutside = (event: any): void => {
    if (boxRef?.current && !boxRef.current?.contains(event.target)) {
      setSelected(defaultFilterHistory);
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxRef]);

  useEffect(() => {
    setSelected(entity);
  }, [entity]);

  useEffect(() => {
    if (id !== "") {
      dispatch(getFilterDetails(id));
      dispatch(checkExistFilterInHistory(id));
    } else {
      setSelected(defaultFilterHistory);
    }
  }, [id, dispatch]);

  return (
    <>
      <div className="box-container p-4" ref={boxRef as any}>
        <div className="box-header d-flex justify-content-between">
          <div className="title">
            <h4>{selected?.name}</h4>
          </div>
          <div className="close">
            <i
              className="fa fa-close cursor-pointer"
              onClick={() => {
                setSelected(defaultFilterHistory);
                onClose();
              }}
            ></i>
          </div>
        </div>
        <div className="box-body">
          <div className="row">
            <div className="col-lg-6">
              {headerCols.map((h) => {
                return (
                  <div
                    key={h.id}
                    className="field d-flex justify-content-between mb-2"
                  >
                    <div className="left">{h.label}</div>

                    <div className="right">
                      {/* @ts-ignore */}
                      {selected ? selected[h.field] : "No Value"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bottom mt-3 mb-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (exits) {
                  dispatch(loadHistoryByFilterId(selected?.id as string));
                }
              }}
            >
              {exits ? "Load History" : "Run"}
            </button>
          </div>
          {history && history.id !== "" && (
            <div className="history row">
              <div className="col-lg-6">
                <div className="future-price d-flex justify-content-between">
                  <p className=" ">Future Price</p>
                  <div className="value">{history.featurePrice}</div>
                </div>

                <div className="future-price d-flex justify-content-between">
                  <p className=" ">After Days</p>
                  <div className="value">{selected?.lookStep} days</div>
                </div>

                <div className="future-price d-flex justify-content-between">
                  <p className=" ">Accuracy Score</p>
                  <div className="value">
                    {(parseFloat(history.accuracyScore || "0") / 1) * 100} %
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
