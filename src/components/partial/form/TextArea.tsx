'use client';

import React from 'react';
import { useValidate } from '@/hooks/useValidate';

type TextAreaProps = {
  id: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validate?: () => string | null;
  rows?: number;
  className?: string;
}

export const TextArea = (props: TextAreaProps) => {
  const { error, handleBlur, handleChange } = useValidate<HTMLTextAreaElement>(
    props.value, 
    props.validate, 
    props.onChange
  );

  return (
    <div className={props.className}>
      <textarea
        id={props.id}
        value={props.value}
        className='block px-4 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full'
        rows={props.rows ?? 3}
        onBlur={handleBlur}
        onChange={handleChange}
      >
      </textarea>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};