import { QueryClient } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';

/**
 * TanStack Query client configuration
 * Sets up the query client with cache persistence using MMKV
 */

// Create MMKV instance for persistence
const storage = new MMKV({
  id: 'novarn-query-storage',
  encryptionKey: process.env.EXPO_PUBLIC_STORAGE_KEY || 'default-encryption-key',
});

// Create a simple persister for TanStack Query
const mmkvPersister = {
  persistClient: async (client: any) => {
    storage.set('tanstack-query-cache', JSON.stringify(client));
  },
  restoreClient: async () => {
    const cache = storage.getString('tanstack-query-cache');
    return cache ? JSON.parse(cache) : undefined;
  },
  removeClient: async () => {
    storage.delete('tanstack-query-cache');
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
