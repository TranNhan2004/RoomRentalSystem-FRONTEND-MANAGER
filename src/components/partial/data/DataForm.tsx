'use client';

import React, { useState } from 'react';
import { Form } from '../form/Form';
import { ActionButton } from '../button/ActionButton';
import { isValidForm } from '@/lib/client/isValidForm';
import { Validators } from '@/types/Validators.type';

export type DataFormProps<T extends object> = {
  formLabel: string;
  validators: Validators<T>;
  saveOnClick: () => void;
  saveAndExitOnClick?: () => void;
  cancelOnClick: () => void;
  children: React.ReactNode;
}

export const DataForm = <T extends object>(props: DataFormProps<T>) => {
  const [action, setAction] = useState<'save' | 'save-and-exit'>('save');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const isValid = await isValidForm(props.validators);
    if (!isValid) {
      setIsSaving(false);
      return;
    }
  
    if (action === 'save') {
      await props.saveOnClick();
    } else {
      await props.saveAndExitOnClick?.();
    }

    setIsSaving(false);
  };

  return (
    <Form label={props.formLabel} onSubmit={handleSubmit}>
      {props.children}
      <div className='w-full h-[60px] rounded-lg bg-gray-200 mt-10'>
        <div className='flex justify-end items-center h-full space-x-2 mr-4'>
          <ActionButton
            mode='save'
            isSubmit
            onClick={() => setAction('save')} 
            disabled={isSaving} 
          >
            Lưu
          </ActionButton>
          
          {
            props.saveAndExitOnClick && (
              <ActionButton
                mode='save'
                isSubmit
                onClick={() => setAction('save-and-exit')}
                disabled={isSaving} 
              >
                Lưu và thoát
              </ActionButton>
            )
          }
          
          <ActionButton
            mode='cancel'
            onClick={props.cancelOnClick}
            disabled={isSaving} 
          >
            Thoát
          </ActionButton>  
        </div>
      </div>
    </Form>
  );
};