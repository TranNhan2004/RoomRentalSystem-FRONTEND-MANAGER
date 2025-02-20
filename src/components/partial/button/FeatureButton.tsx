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
};


interface ActionButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
  color?: keyof typeof colorVariants;
  disabled?: boolean;
  children?: React.ReactNode;
}

const ActionButton = (props: ActionButtonProps) => {
  const color = props.color || 'gray';
  const px = props.children ? 'px-4' : 'px-2';
  const mr = props.children ? 'mr-2' : '';

  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center ${px} py-2 rounded-xl shadow-md 
                    ${props.disabled ? 
                      'cursor-not-allowed bg-gray-400 text-gray-600' : 
                      `${colorVariants[color]} transition-all hover:bg-opacity-80`}`}
        type={props.type}
        disabled={props.disabled}
      > 
        {props.icon}
        <span className={mr}></span>
        <span className='text-sm'>{props.children}</span>
      </button>
    </>
  );
};



type AddButtonProps = ActionButtonProps;
export const AddButton = (props: AddButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<PlusIcon className='w-5 h-5' />}
      type={props.type || 'button'}
      color={props.color || 'green'}
      disabled={props.disabled}
    >
      {props.children}
    </ActionButton>
  );
};


type CancelButtonProps = ActionButtonProps;
export const CancelButton = (props: CancelButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<XMarkIcon className='w-5 h-5' />}
      type={props.type || 'button'}
      color={props.color || 'gray'}
      disabled={props.disabled}
    >
      {props.children}
    </ActionButton>
  );
};


type DeleteButtonProps = ActionButtonProps;
export const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<TrashIcon className='w-5 h-5' />}
      type={props.type || 'button'}
      color={props.color || 'red'}
      disabled={props.disabled}
    >
      {props.children}
    </ActionButton>
  );
};


type EditButtonProps = ActionButtonProps;
export const EditButton = (props: EditButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<PencilSquareIcon className='w-5 h-5' />}
      type={props.type || 'button'}
      color={props.color || 'yellow'}
      disabled={props.disabled}
    >
      {props.children}
    </ActionButton>
  );
};


type FilterButtonProps = ActionButtonProps;
export const FilterButton = (props: FilterButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<FunnelIcon className='w-5 h-5' />}
      type={props.type || 'button'}
      color={props.color || 'blue'}
      disabled={props.disabled}
    >
      {props.children}
    </ActionButton>
  );
};


type InfoButtonProps = ActionButtonProps;
export const InfoButton = (props: InfoButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<InformationCircleIcon className='w-5 h-5' />}
      type={props.type || 'button'}
      color={props.color || 'blue'}
      disabled={props.disabled}
    >
      {props.children}
    </ActionButton>
  );
};


type SaveButtonProps = ActionButtonProps;
export const SaveButton = (props: SaveButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<CheckIcon className='w-5 h-5' />}
      type={props.type || 'submit'}
      color={props.color || 'blue'}
      disabled={props.disabled}
    >
      {props.children}
    </ActionButton>
  );
};


type UploadButtonProps = ActionButtonProps;
export const UploadButton = (props: UploadButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<ArrowUpTrayIcon className='w-5 h-5' />}
      type={props.type || 'button'}
      color={props.color || 'blue'}
      disabled={props.disabled}
    >
      {props.children}
    </ActionButton>
  );
};