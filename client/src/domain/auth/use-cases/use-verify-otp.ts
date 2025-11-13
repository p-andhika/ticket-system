import type { AuthAdapter } from "@/domain/auth/adapters/auth-adapter";
import type { AuthRepository } from "@/domain/auth/repositories/auth-repository";
import { useState } from "react";

export const createUseVerifyOtp = (
  adapter: AuthAdapter,
  repository: AuthRepository,
) => {
  return () => {
    const { setUser } = repository.useAuth();
    const [isVerifyOtp, setIsVerifyOtp] = useState(false);

    const verifyOtp = async (hashedToken: string) => {
      setIsVerifyOtp(true);

      try {
        const response = await adapter.verifyOtp(hashedToken);
        setUser(response.user);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Verify otp failed";

        setIsVerifyOtp(false);
        throw new Error(errorMessage);
      }
    };

    return {
      verifyOtp,
      isVerifyOtp,
    };
  };
};

export type UseVerifyOtp = ReturnType<typeof createUseVerifyOtp>;
