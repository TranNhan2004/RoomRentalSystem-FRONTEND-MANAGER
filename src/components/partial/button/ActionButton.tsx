'use client';

import React from 'react';
import { 
  ArrowUpTrayIcon,
  CheckIcon,
  FunnelIcon, 
  InformationCircleIcon, 
  PencilSquareIcon, 
  PlusIcon, 
  TrashIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const colorVariants = {
  blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  green: 'bg-green-100 text-green-800 hover:bg-green-200',
  yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  red: 'bg-red-100 text-red-800 hover:bg-red-200',
  gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
} as const;


const buttonConfig = {
  add: {
    icon: <PlusIcon className='w-5 h-5' />,
    color: 'green'
  },
  cancel: {
    icon: <XMarkIcon className='w-5 h-5' />,
    color: 'gray'
  },
  delete: {
    icon: <TrashIcon className='w-5 h-5' />,
    color: 'red'
  },
  edit: {
    icon: <PencilSquareIcon className='w-5 h-5' />,
    color: 'yellow'
  },
  filter: {
    icon: <FunnelIcon className='w-5 h-5' />,
    color: 'blue'
  },
  detail: {
    icon: <InformationCircleIcon className='w-5 h-5' />,
    color: 'blue'
  },
  save: {
    icon: <CheckIcon className='w-5 h-5' />,
    color: 'blue'
  },
  upload: {
    icon: <ArrowUpTrayIcon className='w-5 h-5' />,
    color: 'blue'
  },
} as const;

export type ActionButtonProps = {
  onClick?: () => void;
  mode: keyof typeof buttonConfig; 
  isSubmit?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const ActionButton = (props: ActionButtonProps) => {  
  const { icon, color } = buttonConfig[props.mode];

  const px = props.children ? 'px-4' : 'px-2';

  return (
    <button
      onClick={props.onClick}
      className={`flex items-center ${px} py-2 rounded-xl shadow-md 
                  ${props.disabled ? 
                    'cursor-not-allowed bg-gray-400 text-gray-600' : 
                    `${colorVariants[color]} transition-all hover:bg-opacity-80`}`}
      type={props.isSubmit ? 'submit' : 'button'}
      name={props.name}
      value={props.value}
      disabled={props.disabled}
    > 
      {icon}
      {
        props.children && (
          <span className='ml-1 text-sm'>
            {props.children}
          </span>
        )
      }
    </button>
  );
};