import { useState } from "react";
import type { AuthAdapter } from "../adapters/auth-adapter";
import type { AuthRepository } from "../repositories/auth-repository";

export const createUseSignout = (
  adapter: AuthAdapter,
  repository: AuthRepository,
) => {
  return () => {
    const { clearAuth } = repository.useAuth();
    const [isSignInOut, setIsSignInOut] = useState(false);

    const signout = async () => {
      setIsSignInOut(true);

      try {
        adapter.signout();

        clearAuth();

        setIsSignInOut(false);

        return { success: true };
      } catch (error) {
        console.error(error);

        clearAuth();

        setIsSignInOut(false);

        return { success: true };
      }
    };

    return {
      signout,
      isSignInOut,
    };
  };
};

export type UseSignout = ReturnType<typeof createUseSignout>;
