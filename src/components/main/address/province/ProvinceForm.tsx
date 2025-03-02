'use client';

import React from 'react';
import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import { ProvinceMessage } from '@/messages/Address.message';
import { Validators } from '@/types/Validators.type';

type ProvinceFormProps = {
  reqData: ProvinceType;
  setReqData: React.Dispatch<React.SetStateAction<ProvinceType>>;
} & Omit<DataFormProps<ProvinceType>, 'children' | 'cancelOnClick' | 'validators'>;

export const ProvinceForm = (props: ProvinceFormProps) => {
  const router = useRouter();

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push('/addresses/provinces');
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };

  const validators: Validators<ProvinceType> = {
    name: () => {
      if (!props.reqData.name) {
        return ProvinceMessage.NAME_REQUIRED;
      } 
      return null;
    }
  };

  return (
    <>
      <DataForm 
        formLabel={props.formLabel}
        saveOnClick={props.saveOnClick}
        saveAndExitOnClick={props.saveAndExitOnClick}
        cancelOnClick={cancelOnClick}
        validators={validators}
      >
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='name' required>Tên tỉnh: </Label>
          <Input 
            id='name'
            name='name'
            type='text'
            className='w-[300px] ml-[-360px]'
            value={props.reqData.name}
            onChange={handleInputOnChange}
            validate={validators.name}
          />
        </div>
      </DataForm>
    </>
  );
};
