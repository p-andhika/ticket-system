import type {
  AuthSession,
  LoginCredentials,
} from "@/domain/auth/types/auth-types";
import type { HttpClient } from "@/lib/types/http-client";

export type AuthAdapter = {
  login(credentials: LoginCredentials): Promise<AuthSession>;
};

// Implementation.
class AuthAdapterImpl implements AuthAdapter {
  private httpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const response = await this.httpClient.post<AuthSession>("/auth/signin", {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  }
}

// Factory function.
export const createAuthAdapter = (httpClient: HttpClient): AuthAdapter => {
  return new AuthAdapterImpl(httpClient);
};
