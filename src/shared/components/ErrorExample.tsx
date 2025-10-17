/**
 * Example component demonstrating error handling with the useErrorHandler hook
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

export const ErrorExample = () => {
  const [count, setCount] = useState(0);
  const { error, clearError, handleError } = useErrorHandler();

  const handleIncrementError = () => {
    try {
      // Simulate an error condition
      if (count >= 3) {
        throw new Error('Count exceeded maximum allowed value!');
      }
      setCount(count + 1);
    } catch (err) {
      handleError(err);
    }
  };

  const handleAsyncError = async () => {
    try {
      // Simulate an async operation that fails
      await new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Async operation failed!')), 1000)
      );
    } catch (err) {
      handleError(err);
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Error Occurred</Text>
        <Text style={styles.errorText}>{error.message}</Text>
        <TouchableOpacity style={styles.button} onPress={clearError}>
          <Text style={styles.buttonText}>Clear Error</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error Handling Example</Text>
      <Text style={styles.countText}>Count: {count}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleIncrementError}>
        <Text style={styles.buttonText}>Increment (Error at 3)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.asyncButton]} onPress={handleAsyncError}>
        <Text style={styles.buttonText}>Trigger Async Error</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  countText: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c33',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  asyncButton: {
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});