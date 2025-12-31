export type RoleName = 'ROLE_ADMIN' | 'ROLE_MANAGER' | 'ROLE_OPERATOR';

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