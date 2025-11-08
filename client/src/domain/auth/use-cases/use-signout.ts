import { useState } from "react";
import type { AuthAdapter } from "../adapters/auth-adapter";
import type { AuthRepository } from "../repositories/auth-repository";

export const createUseSignOut = (
  adapter: AuthAdapter,
  repository: AuthRepository,
) => {
  return () => {
    const { clearAuth } = repository.useAuth();
    const [isSignInOut, setIsSignInOut] = useState(false);

    const signOut = async () => {
      setIsSignInOut(true);

      try {
        adapter.signOut();

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
      signOut,
      isSignInOut,
    };
  };
};

export type UseSignOut = ReturnType<typeof createUseSignOut>;
