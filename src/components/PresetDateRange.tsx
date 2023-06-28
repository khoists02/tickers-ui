/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable react/jsx-key */
import React, { FC, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfYesterday,
  addWeeks,
  startOfWeek,
  endOfWeek,
  addMonths,
} from "date-fns";
import { DateRange } from "./DateRangePicker";

export enum DateRangePresets {
  TODAY = "TODAY",
  YESTERDAY = "YESTERDAY",
  THIS_WEEK = "THIS_WEEK",
  LAST_WEEK = "LAST_WEEK",
  THIS_MONTH = "THIS_MONTH",
  LAST_MONTH = "LAST_MONTH",
}

const defaultDateRange: DateRange = {
  startDate: null,
  endDate: null,
};

export const getDateRangeFromPresetConfig = (
  preset: DateRangePresets
): DateRange => {
  switch (preset) {
    case DateRangePresets.TODAY:
      return {
        startDate: new Date(),
        endDate: null,
      };
    case DateRangePresets.YESTERDAY:
      return {
        startDate: startOfYesterday(),
        endDate: new Date(),
      };
    case DateRangePresets.LAST_WEEK:
      // eslint-disable-next-line no-case-declarations
      const dayOfLastWeekFromCurrentDay = addWeeks(new Date(), -1);
      return {
        startDate: startOfWeek(dayOfLastWeekFromCurrentDay, {
          weekStartsOn: 1,
        }),
        endDate: endOfWeek(dayOfLastWeekFromCurrentDay, {
          weekStartsOn: 1,
        }),
      };
    case DateRangePresets.THIS_WEEK:
      return {
        startDate: startOfWeek(new Date(), {
          weekStartsOn: 1,
        }),
        endDate: new Date(),
      };
    case DateRangePresets.THIS_MONTH:
      return {
        startDate: startOfMonth(new Date()),
        endDate: new Date(),
      };
    case DateRangePresets.LAST_MONTH:
      // eslint-disable-next-line no-case-declarations
      const dayOfLastMonthFromCurrentDay = addMonths(new Date(), -1);
      return {
        startDate: startOfMonth(dayOfLastMonthFromCurrentDay),
        endDate: endOfMonth(dayOfLastMonthFromCurrentDay),
      };
    default:
      return defaultDateRange;
  }
};

interface PresetDateRangeProps {
  onChange: (dateRange: DateRange) => void;
}

const PresetsKeys = Object.keys(DateRangePresets);

export const PresetDateRange: FC<PresetDateRangeProps> = ({ onChange }) => {
  const [selectedPreset, setSelectedPreset] = useState("");

  return (
    <div className="preset-container p-tb-xs" style={{ minWidth: 100 }}>
      <ul className="m-0 p-0">
        {PresetsKeys.map((preset) => {
          return (
            <li
              onClick={() => {
                setSelectedPreset(preset);
                onChange(
                  getDateRangeFromPresetConfig(preset as DateRangePresets)
                );
              }}
              className={`preset p-lr-sm p-tb-xxs cursor-pointer ${
                selectedPreset === preset ? "selected" : ""
              }`}
              style={{ listStyle: "none" }}
            >
              {preset}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
