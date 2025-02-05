import React from 'react';

interface FormProps {
  label: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className?: string;
}

const Form = (props: FormProps) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>{props.label}</h2>
        <form className={`space-y-4 ${props.className}`} onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </div>
  );
};

export default Form;