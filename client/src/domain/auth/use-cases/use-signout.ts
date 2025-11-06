import { useState } from "react";
import type { AuthAdapter } from "../adapters/auth-adapter";
import type { AuthRepository } from "../repositories/auth-repository";

export const createUseSignout = (
  adapter: AuthAdapter,
  repository: AuthRepository,
) => {
  return () => {
    const { clearAuth } = repository.useAuth();
    const [isSigninOut, setIsSigninOut] = useState(false);

    const signout = async () => {
      setIsSigninOut(true);

      try {
        adapter.signout();

        clearAuth();

        setIsSigninOut(false);

        return { success: true };
      } catch (error) {
        console.error(error);

        clearAuth();

        setIsSigninOut(false);

        return { success: true };
      }
    };

    return {
      signout,
      isSigninOut,
    };
  };
};

export type UseSignout = ReturnType<typeof createUseSignout>;
