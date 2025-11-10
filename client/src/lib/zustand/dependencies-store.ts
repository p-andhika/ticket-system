import {
  createAuthDependencies,
  createQueryClient,
  type AuthDependencies,
} from "@/lib/factories/dependency-factory";
import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

interface DependenciesState {
  queryClient: QueryClient;
  authDependencies: AuthDependencies;
}

export type DependenciesStore = DependenciesState;

export const useDependenciesStore = create<DependenciesStore>()(() => ({
  queryClient: createQueryClient(),
  authDependencies: createAuthDependencies(),
}));
