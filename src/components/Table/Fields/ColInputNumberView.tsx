import React, { FC, useState } from "react";

interface IColInputNumberView {
  value: string;
  onChange: (val: string) => void;
  name: string;
  colId: string;
  validate: {
    max: number;
    min: number;
  };
  readonly: boolean;
}

export const ColInputNumberView: FC<IColInputNumberView> = ({
  value,
  onChange,
  name,
  colId,
  validate,
  readonly,
}) => {
  const [focussed, setFocussed] = useState(false);
  const [selectedVal, setSelectedVal] = useState(value);
  return (
    <>
      <div
        className=""
        onBlur={() => {
          setFocussed(false);
        }}
        onClick={() => {
          setFocussed(true);
        }}
      >
        {(!focussed || readonly) && <span>{selectedVal}</span>}
        {!readonly && (
          <input
            className={`table-input ${focussed ? "focussed" : ""}`}
            value={selectedVal}
            max={validate.max}
            min={validate.min}
            name={name}
            type="number"
            onChange={(e) => {
              setSelectedVal(e.target.value);
              onChange(e.target.value);
            }}
          />
        )}
      </div>
    </>
  );
};
