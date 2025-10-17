/**
 * Alert Component
 * A component for displaying important messages with different types
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/shared/hooks/use-theme-color';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  title?: string;
  message: string;
  type?: AlertType;
  style?: any;
}

export function Alert({ title, message, type = 'info', style }: AlertProps) {
  const backgroundColor = getBackgroundColor(type);
  const textColor = useThemeColor({}, 'text');
  const iconColor = getIconColor(type);
  const icon = getIconName(type);

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <View style={styles.content}>
        <IconSymbol name={icon} size={20} color={iconColor} style={styles.icon} />
        <View style={styles.textContainer}>
          {title && <Text style={[styles.title, { color: textColor }]}>{title}</Text>}
          <Text style={[styles.message, { color: textColor }]}>{message}</Text>
        </View>
      </View>
    </View>
  );
}

const getBackgroundColor = (type: AlertType): string => {
  switch (type) {
    case 'success':
      return '#dcfce7';
    case 'error':
      return '#fee2e2';
    case 'warning':
      return '#fef3c7';
    case 'info':
      return '#dbeafe';
    default:
      return '#dbeafe';
  }
};

const getIconColor = (type: AlertType): string => {
  switch (type) {
    case 'success':
      return '#16a34a';
    case 'error':
      return '#dc2626';
    case 'warning':
      return '#d97706';
    case 'info':
      return '#2563eb';
    default:
      return '#2563eb';
  }
};

const getIconName = (type: AlertType): any => {
  switch (type) {
    case 'success':
      return 'checkmark.circle';
    case 'error':
      return 'xmark.circle';
    case 'warning':
      return 'exclamationmark.triangle';
    case 'info':
      return 'info.circle';
    default:
      return 'info.circle';
  }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
});