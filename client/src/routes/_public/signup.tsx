import { SignUpPage } from "@/domain/auth/view/signup-page";
import { useDependenciesStore } from "@/lib/zustand/dependencies-store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const authDeps = useDependenciesStore((state) => state.authDependencies);
  const { useSignUpForm } = authDeps.useCases;

  return (
    <SignUpPage
      useSignUpForm={useSignUpForm}
      onSignUpSuccess={() => navigate({ to: "/signin" })}
    />
  );
}
