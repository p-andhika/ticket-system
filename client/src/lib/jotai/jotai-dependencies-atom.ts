import { atom } from "jotai";
import {
  createAuthDependencies,
  createQueryClient,
  type AuthDependencies,
} from "../factories/dependency-factory";

// Query client.
export const queryClientDependenciesAtom = atom(createQueryClient());

// Auth
export const authDependenciesAtom = atom<AuthDependencies>(() => {
  return createAuthDependencies();
});
