'use client';
                          
import React from 'react';

export type OptionType = {
  value: string;
  label: string;
}

type SelectProps = {
  id: string;
  value?: string;
  options: OptionType[],
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
                          
export const Select = (props: SelectProps) => {
  return (
    <select
      id={props.id}
      onChange={props.onChange} 
      value={props.value}
      className={`block px-4 py-[10px] border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className}`}
    >
      {
        props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))
      }
      <option value='' label='---'></option>
    </select>
  );
};