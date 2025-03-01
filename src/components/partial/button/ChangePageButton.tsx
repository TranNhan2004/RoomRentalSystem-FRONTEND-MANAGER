'use client';

import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon, 
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

type ChangePageButtonProps = {
  onClick: () => void;
  disabled: boolean;
  children?: React.ReactNode;
}

const ChangePageButton = (props: ChangePageButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        className='flex items-center px-4 py-2 text-sm font-semibold text-gray-600 bg-white border 
                    border-gray-300 rounded-md hover:bg-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed'
      >
        {props.children}
      </button>
    </>
  );
};

type FirstButtonProps = ChangePageButtonProps;
export const FirstButton = (props: FirstButtonProps) => {
  return (
    <ChangePageButton {...props}>
      <ChevronDoubleLeftIcon className='w-5 h-5 mr-2' />
      Đầu
    </ChangePageButton>
  );
};


type PrevButtonProps = ChangePageButtonProps;
export const PrevButton = (props: PrevButtonProps) => {
  return (
    <ChangePageButton {...props}>
      <ChevronLeftIcon className='w-5 h-5 mr-2' />
      Trước
    </ChangePageButton>
  );
};


type NextButtonProps = ChangePageButtonProps;
export const NextButton = (props: NextButtonProps) => {
  return (
    <ChangePageButton {...props}>
      Sau
      <ChevronRightIcon className='w-5 h-5 ml-2' />
    </ChangePageButton>
  );
};


type LastButtonProps = ChangePageButtonProps;
export const LastButton = (props: LastButtonProps) => {
  return (
    <ChangePageButton {...props}>
      Cuối
      <ChevronDoubleRightIcon className='w-5 h-5 ml-2' />
    </ChangePageButton>
  );
};