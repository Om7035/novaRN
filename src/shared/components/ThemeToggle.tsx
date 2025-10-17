/**
 * ThemeToggle Component
 * Allows users to switch between light and dark themes
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '@/shared/store/useThemeStore';
import { useAppTheme } from '@/shared/hooks/use-app-theme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const effectiveTheme = useAppTheme();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
    >
      <Text style={styles.icon}>
        {effectiveTheme === 'light' ? '🌙' : '☀️'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  icon: {
    fontSize: 20,
  },
});