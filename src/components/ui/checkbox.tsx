/**
 * Checkbox Component
 * A customizable checkbox with label
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/shared/hooks/use-theme-color';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  style?: any;
}

export function Checkbox({ label, checked, onChange, disabled = false, style }: CheckboxProps) {
  const textColor = useThemeColor({}, 'text');
  const iconColor = '#3b82f6';

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={[styles.checkbox, disabled && styles.disabled]}>
        {checked && <IconSymbol name="checkmark" size={16} color={iconColor} />}
      </View>
      <Text style={[styles.label, { color: textColor }, disabled && styles.disabledText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#94a3b8',
  },
});