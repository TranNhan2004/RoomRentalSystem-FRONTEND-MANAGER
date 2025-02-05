import React from 'react';

interface InputProps {
  id: string;
  type: string;
  name: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  className?: string;
}


const Input = (props: InputProps) => {
  const { id, type, name, className, ...rest } = props;
  return (
    <>
      <input
        id={id}
        type={type}
        name={name}
        className={`mt-1 w-full h-auto block px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    ${className}`}
        {...rest}
      />
    </>
  );
};

export default Input;