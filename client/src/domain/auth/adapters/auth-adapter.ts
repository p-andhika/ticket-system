import type {
  SigninCredentials,
  SigninResponse,
  SignoutResponse,
  SignupCredentials,
  User,
} from "@/domain/auth/types/auth-types";
import type { HttpClient } from "@/lib/types/http-client";

export type AuthAdapter = {
  signup(credentials: SignupCredentials): Promise<User>;
  signin(credentials: SigninCredentials): Promise<SigninResponse>;
  signout(): Promise<SignoutResponse>;
};

// Implementation.
class AuthAdapterImpl implements AuthAdapter {
  private httpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    const response = await this.httpClient.post<User>("/auth/signup", {
      email: credentials.email,
      password: credentials.password,
    });

    return {
      id: response.data.id,
      email: response.data.email,
    };
  }

  async signin(credentials: SigninCredentials): Promise<SigninResponse> {
    const response = await this.httpClient.post<SigninResponse>(
      "/auth/signin",
      {
        email: credentials.email,
        password: credentials.password,
      },
    );

    return {
      user: response.data.user,
      accessToken: response.data.accessToken,
      expiresAt: response.data.expiresAt,
      refreshToken: response.data.refreshToken,
    };
  }

  async signout(): Promise<SignoutResponse> {
    const response =
      await this.httpClient.post<SignoutResponse>("/auth/signout");

    return {
      message: response.data.message,
    };
  }
}

// Factory function.
export const createAuthAdapter = (httpClient: HttpClient): AuthAdapter => {
  return new AuthAdapterImpl(httpClient);
};
