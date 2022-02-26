export interface SignUpDTO {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface SignInDTO {
  emailOrUsername: string;
  password: string;
}

export interface AuthTokenPayload {
  id: string;
  email: string;
  username: string;
}
