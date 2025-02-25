'use client';

import React from 'react';

export const Spin = () => {
  return (
    <div className='flex items-center justify-center'>
      <span className='w-5 h-5 border-2 border-t-2 border-t-white 
                      border-gray-200 rounded-full animate-spin'>
      </span>
    </div>
  );
};