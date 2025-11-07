export type {
  SigninCredentials,
  SignupCredentials,
} from "@/domain/auth/services/auth-validation";

export type User = {
  email: string;
  id: string;
  // firstName: string;
  // lastName: string;
};

export type SignupResponse = {
  user: User;
};

export type SigninResponse = {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
  user: User;
};

export type SignoutResponse = {
  message: string;
};
