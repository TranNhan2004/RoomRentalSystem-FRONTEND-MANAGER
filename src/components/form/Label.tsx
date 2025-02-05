import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean; 
}

const Label = (props: LabelProps) => {
  return (
    <>
      <label 
        htmlFor={props.htmlFor} 
        className={`block text-sm font-medium text-gray-700 ${props.className}`}
      >
        {props.children}
        {props.required && <span className="text-red-500">*</span>}
      </label>
    </>
  );
};

export default Label;
