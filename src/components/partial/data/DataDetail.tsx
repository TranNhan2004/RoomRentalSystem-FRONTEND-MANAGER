'use client';

import React from 'react';
import { DataLine, DataLineProps } from './DataLine';
import { ActionButton } from '../button/ActionButton';

type DataDetailProps = {
  title: string;
  data: DataLineProps[];
  cancelOnClick: () => void;
}; 

export const DataDetail = (props: DataDetailProps) => {
  return (
    <div className='p-8 mt-[-3%] ml-[-3%]'>
      <h2 className='text-left text-2xl mb-5 font-bold'>{props.title}</h2>
      <div className='ml-2 space-y-2'>
        {
          props.data.map((dataLine, index) => (
            <DataLine key={index} {...dataLine} />
          ))
        }
      </div>
      <div className='w-full h-[60px] rounded-lg bg-gray-200 mt-10'>
        <div className='flex justify-end items-center h-full mr-4'>
          <ActionButton mode='cancel' onClick={props.cancelOnClick}>
            Thoát
          </ActionButton>  
        </div>
      </div>
    </div>
  );
};