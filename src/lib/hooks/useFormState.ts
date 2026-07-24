/** Gestiona estado, validación y envío de formularios. */

import { useState, useCallback } from 'react';
import { validateField } from '@/lib/validation/rules';
import type { ValidationRule } from '@/lib/validation/rules';

interface UseFormStateReturn<T extends Record<string, string>> {
  values: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  hasErrors: boolean;
}

export function useFormState<T extends Record<string, string>>(
  initialValues: T,
  schema: Partial<Record<keyof T, ValidationRule[]>>
): UseFormStateReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(() => {
    const initial = {} as Record<keyof T, string | null>;
    for (const key of Object.keys(initialValues) as (keyof T)[]) {
      initial[key] = null;
    }
    return initial;
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      const fieldRules = schema[name as keyof T];
      if (fieldRules) {
        setErrors((prev) => ({ ...prev, [name]: validateField(value, fieldRules) }));
      }
    },
    [schema]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const fieldRules = schema[name as keyof T];
      if (fieldRules) {
        setErrors((prev) => ({ ...prev, [name]: validateField(value, fieldRules) }));
      }
    },
    [schema]
  );

  const currentHasErrors = Object.values(errors).some(Boolean);

  return {
    values,
    handleChange,
    handleBlur,
    hasErrors: currentHasErrors,
  };
}
