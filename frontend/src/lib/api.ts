import axios from 'axios';
import { ENDPOINTS } from './endpoints';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token if present
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auto-refresh on 401 errors
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) throw new Error('No refresh token');

        const res = await axios.post(ENDPOINTS.REFRESH, { refresh });
        const newAccess = res.data.access;

        localStorage.setItem('access', newAccess);
        setAuthToken(newAccess);
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const login = (username: string, password: string) =>
  api.post(ENDPOINTS.LOGIN, { username, password });

export const register = (data: { username: string; email: string; password: string }) =>
  api.post(ENDPOINTS.REGISTER, data);

export default api;