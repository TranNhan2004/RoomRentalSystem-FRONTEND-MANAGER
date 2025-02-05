import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface InfoButtonProps {
  onClick: () => void;
  className?: string;
}

const InfoButton = (props: InfoButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center px-4 py-2 bg-blue-100 text-blue-800 
                    rounded-2xl shadow-md hover:bg-blue-200 transition-all ${props.className}`}
      >
        <InformationCircleIcon className='w-5 h-5 mr-2' />
        Chi tiết
      </button>
    </>
  );
};

export default InfoButton;