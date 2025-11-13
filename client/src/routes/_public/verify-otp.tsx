import { VerifyOtpPage } from "@/domain/auth/view/verify-otp-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/verify-otp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <VerifyOtpPage />;
}
