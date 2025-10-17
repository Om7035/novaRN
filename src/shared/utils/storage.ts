import { MMKV } from 'react-native-mmkv';

/**
 * MMKV storage utility functions
 * Provides a simple interface for storing and retrieving data with MMKV
 */

export const storage = new MMKV({
  id: 'novarn-storage',
  encryptionKey: process.env.EXPO_PUBLIC_STORAGE_KEY || 'default-encryption-key',
});

// Helper functions for storage operations
export const setString = (key: string, value: string) => {
  storage.set(key, value);
};

export const getString = (key: string): string | undefined => {
  return storage.getString(key);
};

export const setBoolean = (key: string, value: boolean) => {
  storage.set(key, value);
};

export const getBoolean = (key: string): boolean | undefined => {
  return storage.getBoolean(key);
};

export const setNumber = (key: string, value: number) => {
  storage.set(key, value);
};

export const getNumber = (key: string): number | undefined => {
  return storage.getNumber(key);
};

export const remove = (key: string) => {
  storage.delete(key);
};

export const clearAll = () => {
  storage.clearAll();
};
