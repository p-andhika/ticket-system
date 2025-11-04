import { queryOptions } from "@tanstack/react-query";
import { queryTodos } from "../queries/todos";

export const todosQueryOption = queryOptions({
  queryKey: ["todos"],
  queryFn: () => queryTodos(),
  enabled: false,
});
