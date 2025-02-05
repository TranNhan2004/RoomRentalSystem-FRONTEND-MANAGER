import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface SaveButtonProps {
  onClick: () => void;
  className?: string;
}

const SaveButton = (props: SaveButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center px-4 py-2 bg-blue-100 text-blue-800 
                    rounded-2xl shadow-md hover:bg-blue-200 transition-all ${props.className}`}
      >
        <CheckIcon className='w-5 h-5 mr-2' />
        Lưu
      </button>
    </>
  );
};

export default SaveButton;