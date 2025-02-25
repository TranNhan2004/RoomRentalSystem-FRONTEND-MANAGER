'use client';

import { ChevronDoubleUpIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className='bottom-0 right-0 p-4 text-gray-600 text-sm'>
        <div className='ml-[50%] flex items-center'>
          &copy;
          Bản quyền thuộc về Trần Hải Nhân
        </div>

        <button
          onClick={scrollToTop}
          className='fixed bottom-4 right-4 p-2 rounded-full shadow-md transition-all 
                      bg-green-200 text-green-800 bg-opacity-50 hover:bg-green-300'
        >
          <ChevronDoubleUpIcon className='size-6' />
        </button>
      </footer>
    </>
  );
};
