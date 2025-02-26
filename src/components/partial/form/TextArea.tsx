'use client';
                          
import React from 'react';

type TextAreaProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
}

export const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className={`block px-4 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    ${props.className ?? 'w-full'}`}
      rows={props.rows ?? 3}
    >
    </textarea>
  );
};