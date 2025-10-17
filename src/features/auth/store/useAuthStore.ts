import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

/**
 * Authentication store using Zustand
 * Access tokens are NEVER persisted. Only refresh tokens go to SecureStore.
 */

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  (set, get) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    
    setTokens: (accessToken, refreshToken) => {
      // Only persist the refresh token in secure storage
      if (refreshToken) {
        SecureStore.setItemAsync('refreshToken', refreshToken);
      }
      set({ accessToken, refreshToken, isAuthenticated: !!accessToken });
    },
  })
);
