import supabase from "@/lib/supabase/supabase-client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  async beforeLoad({ context: { auth } }) {
    if (!auth?.id) {
      const { data } = await supabase.auth.getUser();
      if (!data.user?.id) throw redirect({ to: "/signin" });
      return { auth: data.user };
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello from authenticated route!
      <Outlet />
    </div>
  );
}
