/**
 * Form utility functions for validation and handling
 */

export interface FormField {
  name: string;
  value: any;
  error?: string;
}

export interface FormState<T> {
  fields: Record<keyof T, FormField>;
  isValid: boolean;
  isSubmitting: boolean;
}

export type ValidationRule = (value: any) => string | null;

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule[];
};

/**
 * Initialize form state with default values
 */
export const initializeForm = <T extends Record<string, any>>(initialValues: T): FormState<T> => {
  const fields: Record<string, FormField> = {};
  
  for (const key in initialValues) {
    fields[key] = {
      name: key,
      value: initialValues[key],
      error: undefined,
    };
  }
  
  return {
    fields: fields as Record<keyof T, FormField>,
    isValid: true,
    isSubmitting: false,
  };
};

/**
 * Validate a single field against its rules
 */
export const validateField = (
  value: any,
  rules: ValidationRule[] = []
): string | null => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

/**
 * Validate all fields in a form
 */
export const validateForm = <T extends Record<string, any>>(
  formState: FormState<T>,
  validationRules: ValidationRules<T>
): FormState<T> => {
  let isValid = true;
  const updatedFields: Record<keyof T, FormField> = { ...formState.fields };
  
  for (const fieldName in formState.fields) {
    const field = formState.fields[fieldName];
    const rules = validationRules[fieldName as keyof T] || [];
    const error = validateField(field.value, rules as ValidationRule[]);
    
    if (error) {
      isValid = false;
    }
    
    updatedFields[fieldName] = {
      ...field,
      error: error || undefined,
    };
  }
  
  return {
    ...formState,
    fields: updatedFields,
    isValid,
  };
};

/**
 * Update a field's value
 */
export const updateField = <T extends Record<string, any>>(
  formState: FormState<T>,
  fieldName: keyof T,
  value: any
): FormState<T> => {
  return {
    ...formState,
    fields: {
      ...formState.fields,
      [fieldName]: {
        ...formState.fields[fieldName],
        value,
        error: undefined, // Clear error when user starts typing
      },
    },
  };
};

/**
 * Common validation rules
 */
export const ValidationRules = {
  required: (message = 'This field is required'): ValidationRule => {
    return (value: any) => {
      if (value === null || value === undefined || value === '') {
        return message;
      }
      return null;
    };
  },
  
  minLength: (min: number, message?: string): ValidationRule => {
    return (value: any) => {
      if (value && value.length < min) {
        return message || `Must be at least ${min} characters`;
      }
      return null;
    };
  },
  
  maxLength: (max: number, message?: string): ValidationRule => {
    return (value: any) => {
      if (value && value.length > max) {
        return message || `Must be no more than ${max} characters`;
      }
      return null;
    };
  },
  
  email: (message = 'Please enter a valid email address'): ValidationRule => {
    return (value: any) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        return message;
      }
      return null;
    };
  },
  
  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => {
    return (value: any) => {
      if (value && !regex.test(value)) {
        return message;
      }
      return null;
    };
  },
};