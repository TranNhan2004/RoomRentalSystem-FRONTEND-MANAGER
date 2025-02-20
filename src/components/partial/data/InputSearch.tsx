'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; 

type InputSearchProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const InputSearch = (props: InputSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      props.onSearch(searchQuery);
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