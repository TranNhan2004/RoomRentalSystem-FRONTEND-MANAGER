'use client';

import React from 'react';
import { getImageSrc } from '@/lib/client/getImageSrc';
import Image from 'next/image';

export type DataLineProps = {
  label?: string;
  value?: string;
  isImage?: boolean;
  width?: number;
  height?: number;
}

export const DataLine = (props: DataLineProps) => {  
  if (!props.value) {
    return null;
  }

  return props.isImage ? (
    <div className='space-y-2'>
      <span className='text-gray-800 mr-1 font-bold'>{props.label}:</span>
      <Image
        src={getImageSrc(props.value ?? '')}
        alt='Logo'
        width={props.width && 40}
        height={props.height && 40} 
      />
    </div>
  ) : (
    <p className='text-gray-800'>
      <span className='text-gray-800 mr-1 font-bold'>{props.label}:</span>{props.value}
    </p>
  );
};