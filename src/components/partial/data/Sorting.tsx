'use client';

import React from 'react';

interface SortingProps {
  options: {
    label: string;
    value: string;
  }[];
  onSort: (optionValue: string) => void;  
}

const Sorting = (props: SortingProps) => {
  return (
    <div className='flex items-center space-x-4 mt-5 ml-[15%]'>
      <span className='text-sm font-semibold'>Sắp xếp theo:</span>
      <select
        onChange={(e) => props.onSort(e.target.value)} 
        className='px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        {
          props.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default Sorting;
