import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { silentRefresh, logout } from '@/features/auth/hooks/useAuth';

/**
 * Axios HTTP client configuration
 * This handles token refresh transparently. Your UI only calls apiClient directly.
 */

const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: 'https://mockapi.novarn.dev',
    timeout: 10000,
  });

  // Request interceptor to add auth token
  client.interceptors.request.use(
    (config) => {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle 401 errors and refresh tokens
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If error is 401 and we haven't tried to refresh token yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Attempt silent refresh
          const refreshResult = await silentRefresh();
          
          if (refreshResult.success) {
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
            return client(originalRequest);
          } else {
            // If refresh fails, logout user
            await logout();
            return Promise.reject(refreshResult.error);
          }
        } catch (refreshError) {
          // If refresh fails, logout user
          await logout();
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createHttpClient();
