import { queryOptions } from "@tanstack/react-query";
import { fetchPosts } from "../fetchers/posts";

export const postsQueryOption = queryOptions({
  queryKey: ["posts"],
  queryFn: () => fetchPosts(),
  enabled: false,
});
