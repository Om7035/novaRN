import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import { useThemeStore } from '@/shared/store/useThemeStore';

/**
 * Custom hook that combines the theme store with the system color scheme
 * Returns the effective theme to use in the app
 */
export function useAppTheme() {
  const systemTheme = useColorScheme();
  const { theme: storedTheme } = useThemeStore();
  
  // If user has selected 'system', use the system theme
  // Otherwise, use the user's selected theme
  return storedTheme === 'system' ? systemTheme : storedTheme;
}