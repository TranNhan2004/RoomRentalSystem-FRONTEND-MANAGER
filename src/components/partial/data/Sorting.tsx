'use client';

import { toastError } from '@/lib/client/alert';
import { sort } from '@/lib/client/sort';
import React from 'react';

type SortingProps<T extends object> = {
  options: {
    label: string;
    value: string;
  }[];
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
}

export const Sorting = <T extends object>(props: SortingProps<T>) => {
  const handleOptionSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [mode, key] = e.target.value.split('-');
    switch (mode) {
      case 'asc':
        props.setData(sort(props.data, key as keyof T, true));
        return;
      case 'desc':
        props.setData(sort(props.data, key as keyof T, false));
        return;
      default:
        await toastError('Lỗi mode của sorting!');
        return;
    }
  };

  return (
    <div className='flex items-center space-x-4'>
      <span className='text-sm font-semibold'>Sắp xếp theo:</span>
      <select
        onChange={(e) => handleOptionSelect(e)} 
        className='px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        {
          props.options.map((option, index) => (
            <option key={index} value={option.value} itemType=''>
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  );
};