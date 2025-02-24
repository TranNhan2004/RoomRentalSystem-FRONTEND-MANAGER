'use client';

import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; 
import { search } from '@/lib/client/search';

type InputSearchProps<T extends object> = {
  placeholder: string;
  options: (keyof T)[];
  originialData: T[];
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
}

const InputSearch = <T extends object>(props: InputSearchProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect(() => {
  //   if (searchQuery === '') {
  //     props.setData(props.originialData);
  //     setSearchQuery('');
  //   }
  // }, [searchQuery, props]);

  const getSearchedData = () => {
    const setValues = new Set<string>();
    props.options.forEach(option => {
      const values = search(props.data, option, searchQuery);
      values.forEach(value => setValues.add(JSON.stringify(value)));
    });  
    return Array.from(setValues).map(value => JSON.parse(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery !== '' && e.key === 'Enter') {
      props.setData(getSearchedData());
    } 
  };

  return (
    <div className='relative w-full max-w-md'>
      <input
        type='text'
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className='w-full px-4 py-2 pl-10 border rounded-full border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
        placeholder={props.placeholder ?? 'Tìm kiếm...'}
      />

      <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
    </div>
  );
};

export default InputSearch;