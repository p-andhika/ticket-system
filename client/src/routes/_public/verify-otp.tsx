import { VerifyOtpPage } from "@/domain/auth/view/verify-otp-page";
import { useDependenciesStore } from "@/lib/zustand/dependencies-store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";

const verifyOtpSchema = z.object({
  hashed_token: z.string().min(1, "Missing or invalid token"),
});

export const Route = createFileRoute("/_public/verify-otp")({
  validateSearch: (search) => verifyOtpSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const { useCases } = useDependenciesStore((state) => state.authDependencies);
  const { useVerifyOtp } = useCases;
  const { verifyOtp } = useVerifyOtp();
  const { hashed_token } = Route.useSearch();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  const handleVerifyOtp = useCallback(async () => {
    try {
      await verifyOtp(hashed_token);
      navigate({ to: "/" });
      toast.success("Signin in success!");
    } catch (error) {
      navigate({ to: "/signin" });
      toast.error(String(error));
      console.error(error);
    }
  }, [hashed_token, navigate, verifyOtp]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    handleVerifyOtp();
  }, [handleVerifyOtp]);

  return <VerifyOtpPage />;
}
