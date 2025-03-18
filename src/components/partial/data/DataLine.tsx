'use client';

import React from 'react';

export type DataLineProps = {
  label?: string;
  value?: string | number;
}

export const DataLine = (props: DataLineProps) => {  
  if (!props.value) {
    return null;
  }

  return (
    <p className='text-gray-800'>
      {props.label && <span className='text-gray-800 mr-1 font-bold'>{props.label}:</span>}{props.value}
    </p>
  );
};