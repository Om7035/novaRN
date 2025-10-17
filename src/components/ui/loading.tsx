/**
 * Loading Component
 * A customizable loading indicator with optional message
 */

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeColor } from '@/shared/hooks/use-theme-color';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  style?: any;
}

export function Loading({ message, size = 'large', color, style }: LoadingProps) {
  const defaultColor = useThemeColor({}, 'text');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color || defaultColor} />
      {message && <Text style={[styles.message, { color: textColor }]}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
  },
});