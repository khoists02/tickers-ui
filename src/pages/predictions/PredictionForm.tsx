import React, { FC, useState, useRef, useEffect } from "react";
import { Card } from "../../components/Card";
import SimpleReactValidator from "simple-react-validator";
import DateRangePicker, {
  DateRange,
  yyyyMMdd,
} from "../../components/DateRangePicker";
import { addDays } from "date-fns";
import { IPredictionRequestAndResponse } from "../../types/tickers";
import { useAppDispatch } from "../../config/store";
import { createPrediction, getPrediction } from "./ducks/operators";
import { useSelector } from "react-redux";
import { IRootState } from "../../config/reducers";
import { useNavigate, useParams } from "react-router-dom";
import { PredictionsAction } from "./ducks/slices";
import { BlockUI } from "../../components/BlockUI";

export const PredictionForm: FC = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { updated, entity, loading } = useSelector(
    (state: IRootState) => state.predictionsReducer
  );
  const [trainFilterDate, setTrainFilterDate] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [testFilterDate, setTestFilterDate] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "The :attribute field is required.",
      },
    })
  );

  useEffect(() => {
    if (params.id) {
      dispatch(getPrediction(params.id));
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (entity?.id) {
      setModel(entity);
      setTrainFilterDate({
        startDate: new Date(entity.trainFilter?.split(",")[0] as string),
        endDate: new Date(entity.trainFilter?.split(",")[1] as string),
      });

      setTestFilterDate({
        startDate: new Date(entity.testFilter?.split(",")[0] as string),
        endDate: new Date(entity.testFilter?.split(",")[1] as string),
      });
    }
  }, [entity]);

  useEffect(() => {
    if (updated) {
      navigate("/Predictions");
    }
    return () => {
      dispatch(PredictionsAction.clearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const [, setError] = useState({});

  const [model, setModel] = useState<IPredictionRequestAndResponse>({
    name: "",
    trainFilter: "",
    testFilter: "",
  });

  const handleSubmit = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      setError({});
    }

    const request: IPredictionRequestAndResponse = {
      id: model.id,
      name: model.name,
      trainFilter: `${trainFilterDate.startDate?.toISOString() as string},${
        trainFilterDate.endDate?.toISOString() as string
      }`,
      testFilter: `${testFilterDate.startDate?.toISOString() as string},${
        testFilterDate.endDate?.toISOString() as string
      }`,
    };

    dispatch(createPrediction(request));
  };

  return (
    <>
      <BlockUI loading={loading}>
        <div className="row">
          <div className="col-lg-12">
            <Card
              title={`${entity?.id ? "Update" : "Create"} Prediction Filter`}
              isExpended={false}
            >
              <form>
                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Name <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-4">
                    <input
                      placeholder="Prediction Name"
                      className="form-control"
                      value={model.name}
                      onChange={(e) => {
                        setModel({ ...model, name: e.target.value });
                      }}
                      type="input"
                      name="name"
                    />
                    <span className="form-text text-danger mt-1">
                      {validator.current.message(
                        "Name",
                        model.name,
                        "required"
                      )}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Train Filter Range <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-4">
                    <DateRangePicker
                      isFilterOverCurrentYear={false}
                      placeholderText={"Filter Date"}
                      onChange={(date) => {
                        setTrainFilterDate({
                          startDate: date.startDate,
                          endDate: date.endDate,
                        });
                        setTestFilterDate({ startDate: null, endDate: null });
                      }}
                      maxDate={addDays(new Date(), 1)}
                      dateFormat={yyyyMMdd}
                      selectedRange={{
                        startDate: trainFilterDate.startDate,
                        endDate: trainFilterDate.endDate,
                      }}
                    />
                    <span className="form-text text-danger mt-1">
                      {validator.current.message(
                        "Train Start Date",
                        trainFilterDate.startDate,
                        "required"
                      )}
                    </span>

                    <span className="form-text text-danger mt-1">
                      {validator.current.message(
                        "Train End Date",
                        trainFilterDate.endDate,
                        "required"
                      )}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-form-label col-md-2">
                    Test Filter Range <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-4">
                    <DateRangePicker
                      isFilterOverCurrentYear={false}
                      placeholderText={"Filter Date"}
                      onChange={(date) => {
                        setTestFilterDate({
                          startDate: date.startDate,
                          endDate: date.endDate,
                        });
                      }}
                      minDate={trainFilterDate.startDate as Date}
                      maxDate={trainFilterDate.endDate as Date}
                      dateFormat={yyyyMMdd}
                      selectedRange={{
                        startDate: testFilterDate.startDate,
                        endDate: testFilterDate.endDate,
                      }}
                    />

                    <span className="form-text text-danger mt-1">
                      {validator.current.message(
                        "Test Start Date",
                        testFilterDate.startDate,
                        "required"
                      )}
                    </span>

                    <span className="form-text text-danger mt-1">
                      {validator.current.message(
                        "Test End Date",
                        testFilterDate.endDate,
                        "required"
                      )}
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    {entity?.id ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </BlockUI>
    </>
  );
};
