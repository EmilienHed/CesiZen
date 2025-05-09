export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  userName: string;
  role: string;
  expiration: Date;

}
