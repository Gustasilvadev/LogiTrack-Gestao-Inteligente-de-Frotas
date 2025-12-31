import api from '@/src/services/api';
import { UserRequest, UserResponse } from '@/src/types/user';
import { LoginUserRequest, JwtTokenResponse } from '@/src/types/login';

export const userService = {
  
  // POST /api/users/loginUser
  login: async (credentials: LoginUserRequest): Promise<JwtTokenResponse> => {
    const { data } = await api.post<JwtTokenResponse>('/api/users/loginUser', credentials);
    // Armazena o token para o interceptor usar nas próximas chamadas
    localStorage.setItem('logitrack_token', data.token);
    return data;
  },

  // POST /api/users/createManager (Usado pelo Admin)
  createManager: async (userData: UserRequest): Promise<UserResponse> => {
    const { data } = await api.post<UserResponse>('/api/users/createManager', userData);
    return data;
  },

  // POST /api/users/createOperator (Usado pelo Manager)
  createOperator: async (userData: UserRequest): Promise<UserResponse> => {
    const { data } = await api.post<UserResponse>('/api/users/createOperator', userData);
    return data;
  },

  // GET /api/users/listTeam
  listTeam: async (): Promise<UserResponse[]> => {
    const { data } = await api.get<UserResponse[]>('/api/users/listTeam');
    return data;
  },
 
  // GET /api/users/listAllManagerOperators
  listAllManagerOperators: async(): Promise<UserResponse[]> =>{
    const {data} = await api.get<UserResponse[]>('/api/users/listAllManagerOperators');
    return data;
  },

  // DELETE /api/users/deleteUserById/{id}
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/api/users/deleteUserById/${id}`);
  },

  // Patch /api/users/{id}/status
  updateStatusLogical: async (id: number, status: string): Promise<void> => {
    await api.patch(`/api/users/${id}/status?status=${status}`);
  },

  // PUT /api/users/update/{id}
  updateUser: async (id: number, userData: UserRequest): Promise<UserResponse> => {
    const { data } = await api.put<UserResponse>(`/api/users/update/${id}`, userData);
    return data;
  },
};