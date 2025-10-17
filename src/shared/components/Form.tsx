/**
 * Reusable Form component with validation support
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm } from '@/shared/hooks/useForm';
import type { ValidationRules } from '@/shared/hooks/useForm';

interface FormProps<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit: (values: T) => void;
  children: (props: FormRenderProps<T>) => React.ReactNode;
}

interface FormRenderProps<T> {
  values: T;
  errors: Partial<Record<keyof T, string | undefined>>;
  setFieldValue: (fieldName: keyof T, value: any) => void;
  validateField: (fieldName: keyof T) => void;
  validate: () => boolean;
  reset: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export function Form<T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit,
  children,
}: FormProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm(initialValues, validationRules);

  const handleSubmit = async () => {
    const isValid = form.validate();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(form.getValues());
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProps: FormRenderProps<T> = {
    values: form.getValues(),
    errors: Object.keys(form.fields).reduce((acc, key) => {
      acc[key as keyof T] = form.fields[key].error;
      return acc;
    }, {} as Partial<Record<keyof T, string | undefined>>),
    setFieldValue: form.setFieldValue,
    validateField: form.validateField,
    validate: form.validate,
    reset: form.reset,
    isSubmitting,
    setIsSubmitting,
  };

  return (
    <View>
      {children(renderProps)}
    </View>
  );
}

interface FormFieldProps<T> {
  name: keyof T;
  label?: string;
  render: (props: FieldRenderProps) => React.ReactNode;
  errors?: Partial<Record<keyof T, string | undefined>>;
  validateField?: (fieldName: keyof T) => void;
}

interface FieldRenderProps {
  error?: string;
  onBlur?: () => void;
}

export function FormField<T>({
  name,
  label,
  render,
  errors,
  validateField,
}: FormFieldProps<T>) {
  const error = errors?.[name];

  const fieldProps: FieldRenderProps = {
    error: error,
    onBlur: () => validateField?.(name),
  };

  return (
    <View style={styles.fieldContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      {render(fieldProps)}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
});