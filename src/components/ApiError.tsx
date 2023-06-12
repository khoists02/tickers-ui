/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type FunctionComponent, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useAppDispatch } from "../config/store";
import { ErrorAction, ErrorMessage } from "../reducers/errorSlice";
import { useSelector } from "react-redux";
import { IRootState } from "../config/reducers";

const ApiError: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { errors } = useSelector((state: IRootState) => state.errorReducer);
  useEffect(() => {
    return () => {
      dispatch(ErrorAction.setError([]));
    };
  }, [dispatch]);

  const closeError = (): void => {
    dispatch(ErrorAction.setError([]));
  };

  const getErrorMessage = (error: ErrorMessage | string): any => {
    if (typeof error === "object" && error !== null) {
      const { code, message, field } = error;
      if (field && message) return `${field}:${message}`;
      if (message) return `${message}`;
      if (code) return "Server Error";
    }
    return error;
  };

  return (
    <>
      {errors.length > 0 && (
        <Alert
          style={{ zIndex: 1000 }}
          variant="danger"
          onClose={closeError}
          dismissible
        >
          <div>{getErrorMessage(errors[errors.length - 1])}</div>
        </Alert>
      )}
    </>
  );
};

export default ApiError;
