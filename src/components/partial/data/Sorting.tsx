'use client';

import React from 'react';
import { sort } from '@/lib/client/sort';
import { Select } from '../form/Select';
import { Label } from '../form/Label';

type SortingProps<T extends object> = {
  options: {
    label: string;
    value: string;
  }[];
  originalData: T[];
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
        props.setData(props.originalData);
        return;
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <Label htmlFor='sorting' className='text-sm font-semibold'>Sắp xếp theo:</Label>
      <Select 
        id='sorting'
        options={props.options}
        onChange={handleOptionSelect}
      />
    </div>
  );
};