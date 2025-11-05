import { SigninPage } from "@/domain/auth/view/signin-page";
import { authDependenciesAtom } from "@/lib/jotai/jotai-dependencies-atom";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

export const Route = createFileRoute("/_public/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const authDeps = useAtomValue(authDependenciesAtom);
  const { useSigninForm } = authDeps.useCases;

  return (
    <SigninPage
      useSigninForm={useSigninForm}
      onSigninSuccess={() => navigate({ to: "/" })}
    />
  );
}
