import { useEffect } from 'react';
import { useSegments, useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

export function useAuthBoundary() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Check if we're in an auth group (like (auth)/login)
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated and not already on an auth screen
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home if authenticated and on an auth screen
      router.replace('/(app)/(tabs)/home');
    }
  }, [isAuthenticated, segments, router]);
}
