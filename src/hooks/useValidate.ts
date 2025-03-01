import { useState, useEffect, useCallback } from 'react';

export const useValidate = <T extends HTMLElement>(
  value: string | number | undefined,
  validate?: () => string | null,
  onChange?: (e: React.ChangeEvent<T>) => void
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
    if (onChange) {
      onChange(e);
    }
    validateInput();  
  };

  useEffect(() => {
    validateInput();  
  }, [value, validateInput]);

  return {
    error,
    handleBlur,
    handleChange
  };
};