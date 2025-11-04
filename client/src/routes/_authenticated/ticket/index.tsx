import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/ticket/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/ticket/"!</div>;
}
