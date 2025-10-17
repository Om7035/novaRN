/**
 * Theme store for managing the application's color scheme
 * Persists theme preference to MMKV storage
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '@/shared/utils/storage';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      toggleTheme: () => set((state) => {
        if (state.theme === 'light') return { theme: 'dark' };
        if (state.theme === 'dark') return { theme: 'system' };
        return { theme: 'light' };
      }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          try {
            const str = storage.getString(name);
            return str ? JSON.parse(str) : null;
          } catch (error) {
            console.error('Error reading theme from storage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            storage.set(name, JSON.stringify(value));
          } catch (error) {
            console.error('Error saving theme to storage:', error);
          }
        },
        removeItem: (name) => {
          try {
            storage.delete(name);
          } catch (error) {
            console.error('Error removing theme from storage:', error);
          }
        },
      })),
    }
  )
);