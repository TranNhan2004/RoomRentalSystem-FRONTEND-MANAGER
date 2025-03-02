import React from 'react';
import { useValidate } from '@/hooks/useValidate';
import { ValidateFunctionType } from '@/types/Validators.type';

type InputProps = {
  id: string;
  type: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: ValidateFunctionType;
  min?: string | number | undefined;
  max?: string | number | undefined;
  placeholder?: string;
  className?: string;
};

export const Input = (props: InputProps) => {
  const { error, handleBlur, handleChange } = useValidate<HTMLInputElement>(
    props.value, 
    props.onChange,
    props.validate
  );

  return (
    <div className={props.className}>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        min={props.min}
        max={props.max}
        className='block h-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full'
        onBlur={handleBlur}
        onChange={handleChange}
        onInvalid={(e) => e.preventDefault()}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>} 
    </div>
  );
};