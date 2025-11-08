import {
  createAuthDependencies,
  createQueryClient,
  type AuthDependencies,
} from "@/lib/factories/dependency-factory";
import { atom } from "jotai";

// Query client.
export const queryClientDependenciesAtom = atom(createQueryClient());

// Auth
export const authDependenciesAtom = atom<AuthDependencies>(() => {
  return createAuthDependencies();
});
