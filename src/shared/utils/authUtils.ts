import { useAuthStore } from '@/features/auth/store/useAuthStore';

/**
 * Authentication utility functions
 * Provides helper functions for checking authentication status
 */

/**
 * Check if user is authenticated
 * @returns boolean indicating if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuthStore.getState();
  return isAuthenticated;
};

/**
 * Get current access token
 * @returns access token or null if not authenticated
 */
export const getAccessToken = (): string | null => {
  const { accessToken } = useAuthStore.getState();
  return accessToken;
};

/**
 * Get current refresh token
 * @returns refresh token or null if not set
 */
export const getRefreshToken = (): string | null => {
  const { refreshToken } = useAuthStore.getState();
  return refreshToken;
};
