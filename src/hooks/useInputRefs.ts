import { useCallback, useRef } from 'react';
import { InputRefHandler } from '@/components/partial/form/Input';

const initInputRefs = (fields: string[]): {[key: string]: InputRefHandler | null} => {
  const refs: {[key: string]: InputRefHandler | null} = {};
  fields.forEach(field => {
    refs[field] = null; 
  });
  return refs;
};

export const useInputRefs = (fields: string[]) => {
  const inputRefs = useRef<{[key: string]: InputRefHandler | null}>(initInputRefs(fields));
  
  const setRef = useCallback((field: string) => {
    return (el: InputRefHandler | null) => {
      inputRefs.current[field] = el;
    };
  }, []);
  
  return { inputRefs, setRef };
};