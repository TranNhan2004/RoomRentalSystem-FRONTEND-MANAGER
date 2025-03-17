import { useState, useEffect, useCallback } from 'react';
import { ValidateFunctionType } from '@/types/Validators.type';

export const useValidate = (
  value: string | number | undefined,
  validate?: ValidateFunctionType,
) => {
  const [error, setError] = useState<string | null>(null);

  const validateInput = useCallback(() => {
    if (validate) {
      setError(validate());
    } else {
      setError(null);
    }
  }, [validate]);

  const handleBlur = () => {
    validateInput(); 
  };

  useEffect(() => {
    if (value) {
      validateInput();
    }  
  }, [value, validateInput]);

  return {
    error,
    handleBlur
  };
};