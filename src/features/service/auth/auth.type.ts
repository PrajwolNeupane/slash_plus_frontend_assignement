export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface GetAccessTokenResponse {
  success: boolean;
  message: string;
  data: User[];
  accessToken: string;
  refreshToken: string;
}

export interface User {
  _id: string;
  email: string;
  photo: string;
}
