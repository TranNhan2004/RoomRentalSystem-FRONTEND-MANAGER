'use client';

import React from 'react';

type TitleProps = {
  children: React.ReactNode;
}

export const Title = (props: TitleProps) => {
  return (
    <div className='inline-block w-full mb-5'>
      <h1 className='text-2xl font-bold relative mb-1'>{props.children}</h1>
      <div className='w-full h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg'></div>
    </div>
  );
};