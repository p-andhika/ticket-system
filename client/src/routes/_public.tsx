import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: async ({ context }) => {
    const { auth } = context;

    // If already authenticated, redirect to home
    if (auth && auth!.id) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
