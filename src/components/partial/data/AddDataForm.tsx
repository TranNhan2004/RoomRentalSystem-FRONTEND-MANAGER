import React, { useState } from 'react';
import Form from '../form/Form';
import { CancelButton, SaveButton } from '../button/FeatureButton';

type AddDataFormProps = {
  formLabel: string;
  saveOnClick: () => void;
  saveAndExitOnClick: () => void;
  cancelOnClick: () => void;
  children: React.ReactNode;
}

const AddDataForm = (props: AddDataFormProps) => {
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
            <SaveButton onClick={() => setAction('save')}>Lưu</SaveButton>
            <SaveButton onClick={() => setAction('save-and-exit')}>Lưu và thoát</SaveButton>
            <CancelButton onClick={props.cancelOnClick}>Thoát</CancelButton>  
          </div>
        </div>
      </Form>
    </>
  );
};

export default AddDataForm;
