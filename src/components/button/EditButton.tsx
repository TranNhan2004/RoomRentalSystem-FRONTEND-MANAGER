import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}

const EditButton = (props: EditButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 
                    rounded-2xl shadow-md hover:bg-yellow-200 transition-all ${props.className}`}
      >
        <PencilSquareIcon className='w-5 h-5 mr-2'/>
        Chỉnh sửa
      </button>
    </>
  );
};

export default EditButton;