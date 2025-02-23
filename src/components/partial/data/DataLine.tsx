'use client';

import { getImageSrc } from '@/lib/client/getImageSrc';
import Image from 'next/image';
import React from 'react';

export type DataLineProps = {
  label?: string;
  value?: string;
  isImage?: boolean;
}

export const DataLine = (props: DataLineProps) => {  
  return props.isImage ? (
    <div className='flex items-center'>
      <span className='text-gray-800 mr-1 font-bold'>{props.label}:</span>
      <Image
        src={getImageSrc(props.value ?? '')}
        alt='Logo'
        width={40}
        height={40}
      />
    </div>
  ) : (
    <p className='text-gray-800'>
      <span className='text-gray-800 mr-1 font-bold'>{props.label}:</span>{props.value}
    </p>
  );
};