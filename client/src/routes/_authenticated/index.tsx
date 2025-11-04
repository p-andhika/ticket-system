import Home from "@/pages/home";
import { createFileRoute } from "@tanstack/react-router";
// import { postsQueryOption } from "@/libs/redaxios/queryOptions/posts";

export const Route = createFileRoute("/_authenticated/")({
  // loader: ({ context: { queryClient } }) =>
  //   queryClient.ensureQueryData(postsQueryOption),
  component: Home,
});
