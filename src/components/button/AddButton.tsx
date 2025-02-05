import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface AddButtonProps {
  onClick: () => void;
  className?: string;
}

const AddButton = (props: AddButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center px-4 py-2 bg-green-100 text-green-800 
                    rounded-2xl shadow-md hover:bg-green-200 transition-all ${props.className}`}
      >
        <PlusIcon className='w-5 h-5 mr-2' />
        Thêm mới
      </button>
    </>
  );
};

export default AddButton;