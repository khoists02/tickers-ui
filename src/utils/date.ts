import { format } from "date-fns";

export const formatDate = (dateStr: string): string => {
  if (!dateStr || dateStr.length === 0) return "";
  return format(new Date(dateStr), "yyyy-MM-dd HH:mm:ss")
};
