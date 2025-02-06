import { FunnelIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface FilterButtonProps {
  onClick: () => void;
  className?: string;
}

const FilterButton = (props: FilterButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center px-4 py-2 bg-blue-100 text-blue-800 
                    rounded-2xl shadow-md hover:bg-blue-200 transition-all ${props.className}`}
      >
        <FunnelIcon className='w-5 h-5 mr-2' />
        Lọc
      </button>
    </>
  );
};

export default FilterButton;