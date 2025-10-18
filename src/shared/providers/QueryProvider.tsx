import React from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { MMKV } from 'react-native-mmkv';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { queryClient } from '@/shared/api/queryClient';

/**
 * Query provider component
 * Sets up TanStack Query with persistence using MMKV storage
 */

// Create MMKV instance for storage
const storage = new MMKV({
  id: 'novarn-query-storage',
  encryptionKey: process.env.EXPO_PUBLIC_STORAGE_KEY || 'default-encryption-key',
});

// Create persister using MMKV storage
const persister = createSyncStoragePersister({
  storage: {
    getItem: (key) => storage.getString(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  },
});

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
