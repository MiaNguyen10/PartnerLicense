export interface tokenType {
  expiresAt: string | undefined;
  token: string | undefined;
}

export interface IUser {
  username?: string;
  password?: string;
  accessToken?: tokenType;
  refreshToken?: tokenType;
}