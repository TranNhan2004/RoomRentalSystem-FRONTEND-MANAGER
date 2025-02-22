import React, { useState } from 'react';
import Form from '../form/Form';
import { ActionButton } from '../button/ActionButton';

export type DataFormProps = {
  formLabel: string;
  saveOnClick: () => void;
  saveAndExitOnClick: () => void;
  cancelOnClick: () => void;
  children: React.ReactNode;
}

export const DataForm = (props: DataFormProps) => {
  const [action, setAction] = useState<'save' | 'save-and-exit'>('save');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form');
    if (action === 'save') {
      props.saveOnClick();
    } else {
      props.saveAndExitOnClick();
    }
  };

  return (
    <>
      <Form label={props.formLabel} onSubmit={handleSubmit}>
        {props.children}
        <div className='w-full h-[60px] rounded-lg bg-gray-200 mt-10'>
          <div className='flex justify-end items-center h-full space-x-2 mr-4'>
            <ActionButton mode='save' isSubmit onClick={() => setAction('save')}>
              Lưu
            </ActionButton>
            
            <ActionButton mode='save' isSubmit onClick={() => setAction('save-and-exit')}>
              Lưu và thoát
            </ActionButton>
            
            <ActionButton mode='cancel' onClick={props.cancelOnClick}>
              Thoát
            </ActionButton>  
          </div>
        </div>
      </Form>
    </>
  );
};