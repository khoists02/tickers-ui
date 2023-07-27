import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

interface IColDateTimeView {
  value: Date | string;
  onChange: (val: Date | string) => void;
  name: string;
  colId: string;
}

export const ColDateTimeView: FC<IColDateTimeView> = ({
  value,
  onChange,
  name,
  colId,
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
        {!focussed && (
          <span>{value ? format(new Date(selected), "yyyy-MM-dd") : ""}</span>
        )}
        <DatePicker
          className={`table-date-time ${focussed ? "focussed" : ""}`}
          selected={selected}
          name={name}
          onChange={(d) => {
            setSelected(d as Date);
            onChange(d as Date);
          }}
        ></DatePicker>
      </div>
    </>
  );
};
