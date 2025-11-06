import { SignoutPage } from "@/domain/auth/view/signup-page";
import { authDependenciesAtom } from "@/lib/jotai/jotai-dependencies-atom";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const authDeps = useAtomValue(authDependenciesAtom);
  const { useSignupForm } = authDeps.useCases;

  return (
    <SignoutPage
      useSignupForm={useSignupForm}
      onSignupSuccess={() => navigate({ to: "/signin" })}
    />
  );
}
