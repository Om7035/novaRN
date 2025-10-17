import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

/**
 * Authentication hook
 * Provides login, logout, and token refresh functionality
 */

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Mock API call for login
 * In a real app, this would call your authentication API
 */
const mockLoginAPI = async (credentials: LoginCredentials): Promise<AuthTokens> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response
  return {
    accessToken: 'mock-access-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
  };
};

/**
 * Mock API call for token refresh
 * In a real app, this would call your refresh token API
 */
const mockRefreshAPI = async (refreshToken: string): Promise<AuthTokens> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response
  return {
    accessToken: 'refreshed-access-token-' + Date.now(),
    refreshToken: 'refreshed-refresh-token-' + Date.now(),
  };
};

/**
 * Login function
 * Calls mock API and saves tokens to store and SecureStore
 */
export const login = async (email: string, password: string) => {
  try {
    const credentials: LoginCredentials = { email, password };
    const tokens = await mockLoginAPI(credentials);
    
    // Save refresh token to SecureStore with hardware authentication on Android
    const secureStoreOptions = Platform.OS === 'android' 
      ? { requireAuthentication: true }
      : {};
    
    await SecureStore.setItemAsync('refreshToken', tokens.refreshToken, secureStoreOptions);
    
    // Set access token and user in Zustand store
    useAuthStore.getState().setTokens(tokens.accessToken, tokens.refreshToken);
    useAuthStore.getState().setUser({
      id: '1',
      email,
      name: 'Demo User',
    });
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Login failed' };
  }
};

/**
 * Logout function
 * Clears Zustand store and deletes refresh token from SecureStore
 */
export const logout = async () => {
  // Clear Zustand store
  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setTokens(null, null);
  
  // Delete refresh token from SecureStore
  await SecureStore.deleteItemAsync('refreshToken');
};

/**
 * Silent refresh function
 * Reads refresh token from SecureStore and calls refresh API
 */
export const silentRefresh = async () => {
  try {
    // Read refresh token from SecureStore
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    
    // Call refresh API
    const tokens = await mockRefreshAPI(refreshToken);
    
    // Update Zustand store with new tokens
    useAuthStore.getState().setTokens(tokens.accessToken, tokens.refreshToken);
    
    return { success: true, accessToken: tokens.accessToken };
  } catch (error: any) {
    // If refresh fails, logout user
    await logout();
    return { success: false, error: error.message || 'Token refresh failed' };
  }
};