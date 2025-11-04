import type { User } from "@/domain/auth/types/auth-types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const currentUserAtom = atomWithStorage<User | null>(
  "current_user",
  null,
);

export const isAuthenticatedAtom = atom((get) => {
  const user = get(currentUserAtom);
  return user !== null;
});
