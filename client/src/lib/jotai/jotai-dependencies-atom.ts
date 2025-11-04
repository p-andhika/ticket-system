import { atom } from "jotai";
import {
  createAuthDependencies,
  createQueryClient,
  type AuthDependencies,
} from "../factories/dependency-factory";

// Query client.
export const queryClientAtom = atom(createQueryClient());

// Auth
export const authAtom = atom<AuthDependencies>(() => {
  return createAuthDependencies();
});
