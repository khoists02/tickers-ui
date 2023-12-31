import React, { type FC, useState, useEffect } from "react";

export interface IOption {
  label: string;
  value: string;
}

interface IDropdown {
  option: IOption[];
  label?: string;
  defaultSelected?: IOption;
  onChange: (item: IOption) => void;
  className?: string;
}

export const Dropdown: FC<IDropdown> = ({
  option = [],
  label,
  defaultSelected,
  onChange,
  className = "",
}) => {
  const [selected, setSelected] = useState<IOption | undefined>(
    defaultSelected
  );
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);
  return (
    <div className={`dropdown ${className}`}>
      <button
        style={{ minWidth: 110 }}
        onClick={() => {
          setShow(!show);
        }}
        className={`btn btn-primary dropdown-toggle ${show ? "show" : ""}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selected !== null && selected !== undefined ? (
          <span>
            {label}: {selected.label}
          </span>
        ) : (
          <span>{label}</span>
        )}
      </button>
      <div className={`dropdown-menu ${show ? "show" : ""}`}>
        {option.map((item) => {
          return (
            <a
              key={item.value}
              className={`dropdown-item ${
                item.value === selected?.value ? "active" : ""
              }`}
              onClick={() => {
                setSelected(item);
                setShow(false);
                onChange(item);
              }}
            >
              <span className="badge badge-ring badge-danger me-1"></span>{" "}
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
};
