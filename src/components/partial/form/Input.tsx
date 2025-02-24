'use client';

import React, { useEffect, useState } from 'react';

interface InputProps {
  id: string;
  type: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validator: {
    validate: () => string | null;
    setIsValids: React.Dispatch<React.SetStateAction<boolean[]>>;
    isValidIndex: number;
  };
  placeholder?: string;
  required?: boolean;
  className?: string;
}


const Input = (props: InputProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { 
    props.validator.setIsValids(prevIsValids => {
      prevIsValids[props.validator.isValidIndex] = !error;
      return prevIsValids;
    });

  }, [error, props]);

  const handleOnBlur = () => {
    if (props.required && !props.value) {
      setError('Trường này không được bỏ trống!');
      return;
    }

    setError(props.validator.validate());
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
    setError(null);
    setError(props.validator.validate());
  };

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
        required={props.required}
        onChange={(e) => handleOnChange(e)}
        onBlur={handleOnBlur}
        onInvalid={(e) => e.preventDefault()}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;