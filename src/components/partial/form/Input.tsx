import React from 'react';
import { useValidate } from '@/hooks/useValidate';

type InputProps = {
  id: string;
  type: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: () => string | null;
  placeholder?: string;
  className?: string;
};

export const Input = (props: InputProps) => {
  const { error, handleBlur, handleChange } = useValidate<HTMLInputElement>(
    props.value, 
    props.validate, 
    props.onChange
  );

  return (
    <div className={props.className}>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
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