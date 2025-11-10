import { SignInPage } from "@/domain/auth/view/signin-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignInPage />;
}
