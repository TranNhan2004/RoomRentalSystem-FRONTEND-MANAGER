'use client';

import React, { useEffect, useState } from 'react';
import { 
  CheckIcon,
  FunnelIcon, 
  InformationCircleIcon, 
  PencilSquareIcon, 
  PlusIcon, 
  TrashIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  color?: string;
  children?: React.ReactNode;
}

const ActionButton = (props: ActionButtonProps) => {
  const [px, setPx] = useState('0');
  const [mr, setMr] = useState('0');

  useEffect(() => {
    if (props.children) {
      setPx('4');
      setMr('2');
    } else {
      setPx('2');
      setMr('0');
    }
  }, [props.children]);
  
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex items-center px-${px} py-2 
                    bg-${props.color}-100 text-${props.color}-800 
                    rounded-xl shadow-md hover:bg-${props.color}-200 transition-all`}
      > 
        {props.icon}
        <span className={`mr-${mr}`}></span>
        <span className='text-sm'>{props.children}</span>
      </button>
    </>
  );
};



type AddButtonProps = Omit<ActionButtonProps, 'icon'>;
export const AddButton = (props: AddButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<PlusIcon className='w-5 h-5' />}
      color={props.color || 'green'}
    >
      {props.children}
    </ActionButton>
  );
};


type CancelButtonProps = Omit<ActionButtonProps, 'icon'>;
export const CancelButton = (props: CancelButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<XMarkIcon className='w-5 h-5' />}
      color={props.color || 'gray'}
    >
      {props.children}
    </ActionButton>
  );
};


type DeleteButtonProps = Omit<ActionButtonProps, 'icon'>;
export const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<TrashIcon className='w-5 h-5' />}
      color={props.color || 'red'}
    >
      {props.children}
    </ActionButton>
  );
};


type EditButtonProps = Omit<ActionButtonProps, 'icon'>;
export const EditButton = (props: EditButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<PencilSquareIcon className='w-5 h-5' />}
      color={props.color || 'yellow'}
    >
      {props.children}
    </ActionButton>
  );
};


type FilterButtonProps = Omit<ActionButtonProps, 'icon'>;
export const FilterButton = (props: FilterButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<FunnelIcon className='w-5 h-5' />}
      color={props.color || 'blue'}
    >
      {props.children}
    </ActionButton>
  );
};


type InfoButtonProps = Omit<ActionButtonProps, 'icon'>;
export const InfoButton = (props: InfoButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<InformationCircleIcon className='w-5 h-5' />}
      color={props.color || 'blue'}
    >
      {props.children}
    </ActionButton>
  );
};


type SaveButtonProps = Omit<ActionButtonProps, 'icon'>;
export const SaveButton = (props: SaveButtonProps) => {
  return (
    <ActionButton 
      onClick={props.onClick} 
      icon={<CheckIcon className='w-5 h-5' />}
      color={props.color || 'blue'}
    >
      {props.children}
    </ActionButton>
  );
};