'use client';

import React, { useState } from 'react';
import { Form } from '../form/Form';
import { ActionButton } from '../button/ActionButton';
import { InputRefHandler } from '../form/Input';
import { isValidatedForm } from '@/lib/client/isValidForm';

export type DataFormProps = {
  formLabel: string;
  inputRefs: React.RefObject<{[key: string]: InputRefHandler | null}>;
  saveOnClick: () => void;
  saveAndExitOnClick?: () => void;
  cancelOnClick: () => void;
  children: React.ReactNode;
}

export const DataForm = (props: DataFormProps) => {
  const [action, setAction] = useState<'save' | 'save-and-exit'>('save');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (!isValidatedForm(props.inputRefs)) {
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