import { currentUserAtom, isAuthenticatedAtom } from "@/lib/jotai/auth-atom";
import { useAtom, useAtomValue } from "jotai";

export const createAuthRepository = () => {
  // Get complete auth state.
  const useAuth = () => {
    const [user, setUser] = useAtom(currentUserAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const clearAuth = () => {
      setUser(null);
    };

    return {
      user,
      setUser,
      clearAuth,
      isAuthenticated,
    };
  };

  // Get current user.
  const useCurrentUser = () => {
    const user = useAtomValue(currentUserAtom);

    return {
      user,
    };
  };

  return {
    useAuth,
    useCurrentUser,
  };
};

export type AuthRepository = ReturnType<typeof createAuthRepository>;
export type UseAuth = AuthRepository["useAuth"];
export type UseCurrentUser = AuthRepository["useCurrentUser"];
