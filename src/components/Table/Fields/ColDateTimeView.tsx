import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

interface IColDateTimeView {
  value: Date | string;
  onChange: (val: Date | string) => void;
  name: string;
  colId: string;
  readonly: boolean;
}

export const ColDateTimeView: FC<IColDateTimeView> = ({
  value,
  onChange,
  name,
  colId,
  readonly,
}) => {
  const [focussed, setFocussed] = useState(false);
  const [selected, setSelected] = useState(
    value ? new Date(value) : new Date()
  );
  return (
    <>
      <div
        onBlur={() => {
          setFocussed(false);
        }}
        onClick={() => {
          setFocussed(true);
        }}
      >
        {(!focussed || readonly) && (
          <span>
            {value ? format(new Date(selected), "yyyy-MM-dd") : "No Value"}
          </span>
        )}
        {!readonly && (
          <DatePicker
            className={`table-date-time ${focussed ? "focussed" : ""}`}
            selected={selected}
            name={name}
            dateFormat="yyyy-MM-dd"
            onChange={(d) => {
              setSelected(d as Date);
              onChange(d as Date);
            }}
          ></DatePicker>
        )}
      </div>
    </>
  );
};
