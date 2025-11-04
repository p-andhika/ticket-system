import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/home";
// import { postsQueryOption } from "@/libs/redaxios/queryOptions/posts";

export const Route = createFileRoute("/")({
  // loader: ({ context: { queryClient } }) =>
  //   queryClient.ensureQueryData(postsQueryOption),
  component: Home,
});
