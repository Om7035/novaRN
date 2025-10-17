/**
 * Custom hook for form handling and validation
 */

import { useState, useCallback } from 'react';
import { 
  FormState, 
  ValidationRules, 
  initializeForm, 
  updateField, 
  validateForm,
  validateField as validateFormField
} from '@/shared/utils/formUtils';

export type { ValidationRules };

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
) => {
  const [formState, setFormState] = useState<FormState<T>>(() => 
    initializeForm(initialValues)
  );

  const setFieldValue = useCallback((fieldName: keyof T, value: any) => {
    setFormState(prev => updateField(prev, fieldName, value));
  }, []);

  const validate = useCallback(() => {
    if (!validationRules) return true;
    
    const validatedForm = validateForm(formState, validationRules);
    setFormState(validatedForm);
    return validatedForm.isValid;
  }, [formState, validationRules]);

  const validateSingleField = useCallback((fieldName: keyof T) => {
    if (!validationRules) return;
    
    const rules = validationRules[fieldName] || [];
    const field = formState.fields[fieldName];
    const error = validateFormField(field.value, rules);
    
    setFormState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [fieldName]: {
          ...field,
          error: error || undefined,
        },
      },
    }));
  }, [formState, validationRules]);

  const reset = useCallback(() => {
    setFormState(initializeForm(initialValues));
  }, [initialValues]);

  const getValues = useCallback((): T => {
    const values: Partial<T> = {};
    for (const fieldName in formState.fields) {
      values[fieldName] = formState.fields[fieldName].value;
    }
    return values as T;
  }, [formState]);

  return {
    ...formState,
    setFieldValue,
    validate,
    validateField: validateSingleField,
    reset,
    getValues,
  };
};