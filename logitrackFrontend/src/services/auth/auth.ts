import api from '@/src/services/api';
import { LoginUserRequest, JwtTokenResponse } from '@/src/types/login';

export const authService = {
  login: async (credentials: LoginUserRequest): Promise<JwtTokenResponse> => {
    const { data } = await api.post<JwtTokenResponse>('/api/users/loginUser', credentials);
    
    // Salva o token no navegador
    if (data.token) {
      localStorage.setItem('@LogiTrack:token', data.token);
      localStorage.setItem('@LogiTrack:user', JSON.stringify({ nome: data.name, email: data.email }));
    }
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('@LogiTrack:token');
    localStorage.removeItem('@LogiTrack:user');
  }
};