import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import QueryProvider from '@/shared/providers/QueryProvider';
import { useAuthBoundary } from '@/shared/hooks/useAuthBoundary';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const appTheme = useAppTheme();
  useAuthBoundary();

  // Determine which theme to use for React Navigation
  const navigationTheme = appTheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider value={navigationTheme}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style={appTheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}