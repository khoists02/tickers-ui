import { format } from "date-fns";

export const formatDate = (dateStr: string, formatPattern = "yyyy-MM-dd HH:mm:ss"): string => {
  if (!dateStr || dateStr.length === 0) return "";
  return format(new Date(dateStr), formatPattern)
};

export const range = (start: number, end: number, step = 1): number[] => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill(0)
    .map((_, idx) => start + idx * step);
};
