/**
 * Custom hook for handling errors in components
 * Provides utilities for error state management and logging
 */

import { useState, useCallback } from 'react';

export interface ErrorHandler {
  error: Error | null;
  setError: (error: Error | null) => void;
  clearError: () => void;
  handleError: (error: unknown) => void;
}

export const useErrorHandler = (): ErrorHandler => {
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: unknown) => {
    // Log the error to console
    console.error('Caught error:', error);
    
    // Convert to Error object if it isn't already
    if (error instanceof Error) {
      setError(error);
    } else if (typeof error === 'string') {
      setError(new Error(error));
    } else {
      setError(new Error('An unknown error occurred'));
    }
    
    // You could also log to a remote service here
    // logErrorToService(error);
  }, []);

  return {
    error,
    setError,
    clearError,
    handleError,
  };
};