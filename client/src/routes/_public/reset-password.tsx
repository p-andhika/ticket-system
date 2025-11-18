import { ResetPasswordPage } from "@/domain/auth/view/reset-password-page";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const verifyOtpSchema = z.object({
  hashed_token: z.string().min(1, "Missing or invalid token"),
});

export const Route = createFileRoute("/_public/reset-password")({
  validateSearch: (search) => verifyOtpSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <ResetPasswordPage />;
}
