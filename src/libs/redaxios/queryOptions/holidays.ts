import { queryOptions } from "@tanstack/react-query";
import { fetchHolidays } from "../fetchers/holidays";

export const holidaysQueryOption = queryOptions({
  queryKey: ["holidays"],
  queryFn: () => fetchHolidays(),
});
