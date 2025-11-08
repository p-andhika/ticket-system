export type {
  SignInCredentials,
  SignUpCredentials,
} from "@/domain/auth/services/auth-validation";

export type User = {
  email: string;
  id: string;
  // firstName: string;
  // lastName: string;
};

export type SignUpResponse = {
  user: User;
};

export type SignInResponse = {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
  user: User;
};

export type SignOutResponse = {
  message: string;
};
