import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

type InputProps = {
  id: string;
  type: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate: () => string | null;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export type InputRefHandler = {
  formValidate: () => boolean;
};

export const Input = forwardRef<InputRefHandler, InputProps>((props, ref) => {
  const [error, setError] = useState<string | null>(null); 
  const errorRef = useRef<string | null>(null); 

  const validate = () => {
    if (props.required && !props.value) {
      errorRef.current = 'Trường này không được bỏ trống!';
      setError(errorRef.current); 
      return;
    }
    errorRef.current = props.validate();
    setError(errorRef.current); 
  };

  const handleOnBlur = () => {
    validate();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
    validate();
  };

  useImperativeHandle(ref, () => ({
    formValidate: () => {
      validate();
      return errorRef.current ? false : true; 
    }
  }));

  useEffect(() => {
    if (props.value) {
      errorRef.current = props.validate();
      setError(errorRef.current);  
    }
  }, [props]);

  return (
    <div>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        className={`mt-1 h-auto block px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    ${props.className ?? 'w-full'}`}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onInvalid={(e) => e.preventDefault()}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>} 
    </div>
  );
});

Input.displayName = 'Input';
