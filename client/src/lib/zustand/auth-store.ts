import type { User } from "@/domain/auth/types/auth-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type AuthState = {
  currentUser: User | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  actions: {
    setUser: (user: User | null) => void;
    clearAuth: () => void;
  };
};

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      // State
      currentUser: null,
      isAuthenticated: false,

      // Actions
      actions: {
        setUser: (user) =>
          set((state) => {
            state.currentUser = user;
            state.isAuthenticated = user !== null;
          }),

        clearAuth: () =>
          set((state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
          }),
      },
    })),
    {
      name: "current_user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
