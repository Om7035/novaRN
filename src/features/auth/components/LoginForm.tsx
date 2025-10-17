/**
 * LoginForm Component
 * Provides a styled login form with email and password fields
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { login } from '@/features/auth/hooks/useAuth';
import { Form, FormField } from '@/shared/components/Form';
import { ValidationRules } from '@/shared/utils/formUtils';

interface LoginFormValues {
  email: string;
  password: string;
}

const validationRules = {
  email: [
    ValidationRules.required('Email is required'),
    ValidationRules.email('Please enter a valid email address'),
  ],
  password: [
    ValidationRules.required('Password is required'),
    ValidationRules.minLength(6, 'Password must be at least 6 characters'),
  ],
};

export const LoginForm = () => {
  const [generalError, setGeneralError] = useState('');

  const handleLogin = async (values: LoginFormValues) => {
    setGeneralError('');
    
    try {
      const result = await login(values.email, values.password);
      if (!result.success) {
        setGeneralError(result.error || 'Login failed');
      }
    } catch (err: any) {
      setGeneralError(err.message || 'An unexpected error occurred');
    }
  };

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validationRules={validationRules}
      onSubmit={handleLogin}
    >
      {({ values, errors, setFieldValue, validateField, validate, isSubmitting }) => (
        <View style={styles.container}>
          <FormField<LoginFormValues>
            name="email"
            label="Email"
            errors={errors}
            validateField={validateField}
            render={({ error }) => (
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Email"
                value={values.email}
                onChangeText={(text) => setFieldValue('email', text)}
                onBlur={() => validateField('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />
          
          <FormField<LoginFormValues>
            name="password"
            label="Password"
            errors={errors}
            validateField={validateField}
            render={({ error }) => (
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Password"
                value={values.password}
                onChangeText={(text) => setFieldValue('password', text)}
                onBlur={() => validateField('password')}
                secureTextEntry
              />
            )}
          />
          
          {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}
          
          <TouchableOpacity 
            style={[styles.button, isSubmitting && styles.buttonDisabled]} 
            onPress={() => validate()}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Form>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ef4444',
    marginBottom: 15,
    textAlign: 'center',
  },
});