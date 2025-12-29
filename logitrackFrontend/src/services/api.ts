import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Interceptor para injetar o Token em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@LogiTrack:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;