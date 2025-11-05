import type {
  AuthSession,
  SigninCredentials,
} from "@/domain/auth/types/auth-types";
import type { HttpClient } from "@/lib/types/http-client";

export type AuthAdapter = {
  signin(credentials: SigninCredentials): Promise<AuthSession>;
};

// Implementation.
class AuthAdapterImpl implements AuthAdapter {
  private httpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async signin(credentials: SigninCredentials): Promise<AuthSession> {
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
