export type RoleName = 'ADMIN' | 'MANAGER' | 'OPERADOR';

export interface JwtTokenResponse {
  token: string;
  name: string;
  email: string;
  roleName: RoleName;
}

export interface LoginUserRequest {
  email: string;
  password:  string;
}