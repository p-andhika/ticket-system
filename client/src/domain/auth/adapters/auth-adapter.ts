import type {
  SignInCredentials,
  SignInResponse,
  SignoutResponse,
  SignupCredentials,
  SignupResponse,
  User,
} from "@/domain/auth/types/auth-types";
import { requestApiData } from "@/lib/adapters/api-error-handler";
import type { HttpClient } from "@/lib/types/http-client";

export type AuthAdapter = {
  signup(credentials: SignupCredentials): Promise<User>;
  signin(credentials: SignInCredentials): Promise<SignInResponse>;
  signout(): Promise<SignoutResponse>;
};

// Implementation.
class AuthAdapterImpl implements AuthAdapter {
  private httpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    const response = await requestApiData<SignupResponse>(
      () =>
        this.httpClient.post<SignupResponse>("/auth/signup", {
          email: credentials.email,
          password: credentials.password,
        }),
      "Signup failed!",
    );

    return {
      id: response.user.id,
      email: response.user.email,
    };
  }

  async signin(credentials: SignInCredentials): Promise<SignInResponse> {
    const response = await requestApiData<SignInResponse>(
      () =>
        this.httpClient.post<SignInResponse>("/auth/signin", {
          email: credentials.email,
          password: credentials.password,
        }),
      "Signin failed!",
    );

    return {
      user: response.user,
      accessToken: response.accessToken,
      expiresAt: response.expiresAt,
      refreshToken: response.refreshToken,
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
