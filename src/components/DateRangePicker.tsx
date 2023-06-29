import React, { FC, useState, useRef, useEffect } from "react";
import * as locales from "date-fns/locale";
import { DateTime } from "luxon";
import { getMonth, getYear, format, isValid, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { range } from "../utils/date";
import { PresetDateRange } from "./PresetDateRange";

export const YYYYMMDD = "YYYYMMDD";
export const yyyyMMdd = "yyyyMMdd";

export const formatDateRange = (date?: Date, fmt?: string): string =>
  date ? format(date, fmt || yyyyMMdd) : "";

export interface DateRange {
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface ReactDateRangeProps {
  onChange?: (e: DateRange) => void;
  range?: DateRange;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  dateFormat?: string;
  selectedRange?: DateRange;
  readonly?: boolean;
  timeIntervals?: number;
  isFilterOverCurrentYear?: boolean;
  isPresetsConfig?: boolean;
  maxTime?: number;
  popoverClass?: string;
}

const defaultDateRange: DateRange = {
  startDate: null,
  endDate: null,
};

export type Locales = Record<string, Locale>;

export const renderCustomHeader = (
  locale: Locale,
  params: {
    monthDate: Date;
    date: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
    customHeaderCount: number;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
    decreaseYear: () => void;
    increaseYear: () => void;
    prevYearButtonDisabled: boolean;
    nextYearButtonDisabled: boolean;
    isFilterOverCurrentYear?: boolean;
  }
): React.ReactNode => {
  const years = range(
    1900,
    getYear(new Date()) + (params.isFilterOverCurrentYear ? 10 : 0),
    1
  );
  const months = range(0, 11).map((m) => locale.localize?.month(m)) as string[];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        className="btn btn-light"
        onClick={params.decreaseMonth}
        disabled={params.prevMonthButtonDisabled}
      >
        {"<"}
      </button>
      <select
        style={{ width: "84px" }}
        className="form-control"
        value={getYear(params.date)}
        onChange={({ target: { value } }) => {
          params.changeYear(parseInt(value, 10));
        }}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="form-control"
        value={months[getMonth(params.date)]}
        onChange={({ target: { value } }) => {
          params.changeMonth(months.indexOf(value));
        }}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="btn btn-light"
        onClick={params.increaseMonth}
        disabled={params.nextMonthButtonDisabled}
      >
        {">"}
      </button>
    </div>
  );
};

export const parseDateFromString = (
  dirtyDate?: string,
  fmt?: string,
  isTimeValue?: boolean
): Date | undefined => {
  if (
    isTimeValue ||
    (dirtyDate && isValid(parse(dirtyDate, fmt || yyyyMMdd, new Date())))
  ) {
    const date = fmt
      ? DateTime.fromFormat(dirtyDate as string, fmt).toJSDate()
      : DateTime.fromISO(dirtyDate as string).toJSDate();
    return isValid(date) ? date : undefined;
  }
  return undefined;
};

const DateRangePicker: FC<ReactDateRangeProps> = ({
  onChange,
  minDate,
  maxDate,
  placeholderText,
  dateFormat,
  selectedRange,
  readonly,
  isFilterOverCurrentYear = true,
  isPresetsConfig = false,
}): React.ReactElement => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState(selectedRange || defaultDateRange);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const formatPattern = dateFormat || yyyyMMdd;
  const localName = "enUS";
  const locale = (locales as Locales)[localName];

  useEffect(() => {
    if (!selectedRange?.startDate && !selectedRange?.endDate) {
      setInputValue("");
    }

    if (selectedRange?.startDate && selectedRange.endDate) {
      setDateRange(selectedRange);
      setInputValue(
        `${format(selectedRange.startDate, yyyyMMdd)}-${format(
          selectedRange.endDate,
          yyyyMMdd
        )}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange]);
  const updateInputValue = (inputStr: string): void => {
    if (inputStr) {
      const r = inputStr.split("-");
      if (r) {
        const startDate = parseDateFromString(r[0]);
        const endDate = parseDateFromString(r[1]);
        if (onChange) {
          onChange({
            startDate,
            endDate,
          });
        }

        setInputValue(
          `${formatDateRange(
            startDate as Date,
            formatPattern
          )}-${formatDateRange(endDate as Date, formatPattern)}`
        );
      }
    } else {
      setInputValue(inputStr);
      setDateRange({ startDate: null, endDate: null });
      if (onChange) {
        onChange({
          startDate: null,
          endDate: null,
        });
      }
    }
  };

  return (
    <>
      <OverlayTrigger
        show={show}
        placement="bottom"
        trigger="click"
        rootCloseEvent={"click"}
        overlay={
          <Popover
            id={Date.now().toString()}
            className={`${readonly ? "arrow-none" : ""}`}
          >
            {!readonly ? (
              <div
                ref={popoverRef}
                style={{ display: isPresetsConfig ? "flex" : "" }}
              >
                {isPresetsConfig && (
                  <PresetDateRange
                    onChange={(date) => {
                      if (onChange) {
                        onChange(date);
                      }
                    }}
                  />
                )}

                <ReactDatePicker
                  dateFormat={formatPattern}
                  renderCustomHeader={(params) =>
                    renderCustomHeader(locale, {
                      ...params,
                      isFilterOverCurrentYear,
                    })
                  }
                  // calendarContainer={CustomCalendarContainer}
                  onChange={(rangeChange) => {
                    const [startDate, endDate] =
                      rangeChange as Array<Date | null>;
                    const newDateRange: DateRange = { startDate, endDate };
                    if (onChange) onChange(newDateRange);
                    setDateRange(newDateRange);
                    setInputValue(
                      `${formatDateRange(
                        startDate as Date,
                        formatPattern
                      )}-${formatDateRange(endDate as Date, formatPattern)}`
                    );
                    setShow(!endDate);
                  }}
                  locale={locale}
                  selectsRange
                  startDate={dateRange?.startDate}
                  endDate={dateRange?.endDate}
                  inline
                  maxDate={maxDate}
                  minDate={minDate}
                  isClearable
                  disabled={readonly}
                />
              </div>
            ) : null}
          </Popover>
        }
      >
        <div className="form-group has-feedback has-clear pos-r">
          <input
            className="form-control"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder={placeholderText}
            disabled={readonly}
            onClick={() => {
              setShow(!show);
            }}
          />
          {inputValue && !readonly && (
            <>
              <button
                type="button"
                className="react-datepicker__close-icon"
                aria-label="Close"
                onClick={(e) => {
                  e.preventDefault();
                  updateInputValue("");
                }}
              />
            </>
          )}
        </div>
      </OverlayTrigger>
    </>
  );
};

export default DateRangePicker;
