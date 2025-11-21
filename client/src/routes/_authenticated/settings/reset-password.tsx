import { ResetPasswordPage } from "@/domain/auth/view/reset-password-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/reset-password")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <ResetPasswordPage />;
}
