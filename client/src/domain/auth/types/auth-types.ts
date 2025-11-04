export type User = {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthSession = {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
  user: User;
};
