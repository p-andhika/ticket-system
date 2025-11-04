import type {
  AuthSession,
  LoginCredentials,
} from "@/domain/auth/types/auth-types";

export type AuthApiAdapter = {
  login(credentials: LoginCredentials): Promise<AuthSession>;
};
