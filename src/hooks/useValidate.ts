import { useState, useEffect, useCallback } from 'react';
import { ValidateFunctionType } from '@/types/Validators.type';

export const useValidate = <T extends HTMLElement>(
  value: string | number | undefined,
  onChange: (e: React.ChangeEvent<T>) => void,
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

  const handleChange = (e: React.ChangeEvent<T>) => {
    onChange(e);
    validateInput();  
  };

  useEffect(() => {
    if (value) {
      validateInput();
    }  
  }, [value, validateInput]);

  return {
    error,
    handleBlur,
    handleChange
  };
};