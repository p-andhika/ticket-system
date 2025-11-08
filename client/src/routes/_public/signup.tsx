import { SignUpPage } from "@/domain/auth/view/signup-page";
import { authDependenciesAtom } from "@/lib/jotai/jotai-dependencies-atom";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const authDeps = useAtomValue(authDependenciesAtom);
  const { useSignUpForm } = authDeps.useCases;

  return (
    <SignUpPage
      useSignUpForm={useSignUpForm}
      onSignUpSuccess={() => navigate({ to: "/signin" })}
    />
  );
}
