import { format } from "date-fns";

export const formatDate = (dateStr: string, formatPattern = "yyyy-MM-dd HH:mm:ss"): string => {
  if (!dateStr || dateStr.length === 0) return "";
  return format(new Date(dateStr), formatPattern)
};
