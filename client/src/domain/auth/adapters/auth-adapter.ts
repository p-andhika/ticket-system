import type {
  SignInCredentials,
  SignInResponse,
  SignOutResponse,
  SignUpCredentials,
  SignUpResponse,
  User,
} from "@/domain/auth/types/auth-types";
import { requestApiData } from "@/lib/adapters/api-error-handler";
import type { HttpClient } from "@/lib/types/http-client";

export type AuthAdapter = {
  signUp(credentials: SignUpCredentials): Promise<User>;
  magicLink(email: string): Promise<{ message: string }>;
  forgotPassword(email: string): Promise<{ message: string }>;
  resetPassword(newPassword: string): Promise<{ message: string }>;
  verifyOtp(hashedToken: string): Promise<SignInResponse>;
  signIn(credentials: SignInCredentials): Promise<SignInResponse>;
  signOut(): Promise<SignOutResponse>;
};

// Implementation.
class AuthAdapterImpl implements AuthAdapter {
  private httpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await requestApiData<SignUpResponse>(
      () =>
        this.httpClient.post<SignUpResponse>("/auth/signup", {
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

  async magicLink(email: string): Promise<{ message: string }> {
    const response = await requestApiData<{ message: string }>(
      () =>
        this.httpClient.post("/auth/magic-link", {
          email,
        }),
      "Magic link failed!",
    );

    return {
      message: response.message,
    };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await requestApiData<{ message: string }>(
      () =>
        this.httpClient.post("/auth/forgot-password", {
          email,
        }),
      "Fogot password link failed!",
    );

    return {
      message: response.message,
    };
  }

  async resetPassword(newPassword: string): Promise<{ message: string }> {
    const response = await requestApiData<{ message: string }>(
      () =>
        this.httpClient.post("/auth/reset-password", {
          newPassword,
        }),
      "Reset password link failed!",
    );

    return {
      message: response.message,
    };
  }

  async verifyOtp(hashedToken: string): Promise<SignInResponse> {
    const response = await requestApiData<SignInResponse>(
      () =>
        this.httpClient.post<SignInResponse>("/auth/verify-otp", {
          hashedToken,
        }),
      "Verify OTP failed!",
    );

    return {
      user: response.user,
      accessToken: response.accessToken,
      expiresAt: response.expiresAt,
      refreshToken: response.refreshToken,
    };
  }

  async signIn(credentials: SignInCredentials): Promise<SignInResponse> {
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

  async signOut(): Promise<SignOutResponse> {
    const response =
      await this.httpClient.post<SignOutResponse>("/auth/signout");

    return {
      message: response.data.message,
    };
  }
}

// Factory function.
export const createAuthAdapter = (httpClient: HttpClient): AuthAdapter => {
  return new AuthAdapterImpl(httpClient);
};
