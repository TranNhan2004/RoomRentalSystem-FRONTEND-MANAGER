import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface CancelButtonProps {
  onClick: () => void;
  className?: string;
}

const CancelButton = (props: CancelButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center px-4 py-2 bg-gray-100 text-gray-800 
                    rounded-2xl shadow-md hover:bg-gray-200 transition-all ${props.className}`}
      >
        <XMarkIcon className='w-5 h-5 mr-2' />
        Hủy
      </button>
    </>
  );
};

export default CancelButton;