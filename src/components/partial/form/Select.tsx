'use client';

import React from 'react';
import { useValidate } from '@/hooks/useValidate';
import { ValidateFunctionType } from '@/types/Validators.type';

export type OptionType = {
  value: string;
  label: string;
}

type SelectProps = {
  id: string;
  value?: string;
  options: OptionType[],
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  validate?: ValidateFunctionType;
  className?: string;
}
                          
export const Select = (props: SelectProps) => {
  const { error, handleBlur } = useValidate(props.value, props.validate);
  
  return (
    <div className={props.className}>
      <select
        id={props.id}
        value={props.value}
        className='block px-4 py-[9px] border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full'
        onBlur={handleBlur}
        onChange={props.onChange} 
        onInvalid={(e) => {e.preventDefault();}}
      >
        {
          props.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        }
        <option value=''>---</option>
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};