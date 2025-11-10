import { useAuthStore } from "@/lib/zustand/auth-store";

export const createAuthRepository = () => {
  // Get complete auth state.
  const useAuth = () => {
    const user = useAuthStore((state) => state.currentUser);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setUser = useAuthStore((state) => state.actions.setUser);
    const clearAuth = useAuthStore((state) => state.actions.clearAuth);

    return {
      user,
      setUser,
      clearAuth,
      isAuthenticated,
    };
  };

  // Get current user.
  const useCurrentUser = () => {
    const user = useAuthStore((state) => state.currentUser);

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
