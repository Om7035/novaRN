/**
 * Card Component
 * A container component with rounded corners and shadow for displaying content
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/shared/hooks/use-theme-color';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  style?: any;
  contentStyle?: any;
}

export function Card({ children, title, style, contentStyle }: CardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {title && <Text style={[styles.title, { color: textColor }]}>{title}</Text>}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {},
});