import { queryOptions } from "@tanstack/react-query";
import { queryHistories } from "../queries/histories";

export const historiesQueryOption = queryOptions({
  queryKey: ["todos"],
  queryFn: () => queryHistories(),
});
