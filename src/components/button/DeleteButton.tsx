import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
}

const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center px-4 py-2 bg-red-100 text-red-800 
                    rounded-2xl shadow-md hover:bg-red-200 transition-all ${props.className}`}
      >
        <TrashIcon className='w-5 h-5 mr-2' />
        Xóa
      </button>
    </>
  );
};

export default DeleteButton;