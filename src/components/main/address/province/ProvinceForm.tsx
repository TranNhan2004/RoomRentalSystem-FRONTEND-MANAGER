'use client';

import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import Input from '@/components/partial/form/Input';
import Label from '@/components/partial/form/Label';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import React from 'react';

type ProvinceFormProps = {
  reqData: ProvinceType;
  setReqData: React.Dispatch<React.SetStateAction<ProvinceType>>;
} & Omit<DataFormProps, 'children' | 'cancelOnClick'>;

const ProvinceForm = (props: ProvinceFormProps) => {
  const router = useRouter();

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push('/addresses/provinces');
    });
  };

  return (
    <>
      <DataForm 
        formLabel={props.formLabel}
        saveOnClick={props.saveOnClick}
        saveAndExitOnClick={props.saveAndExitOnClick}
        cancelOnClick={cancelOnClick}
      >
        <div className='flex items-center'>
          <Label htmlFor='name' required>Tên tỉnh: </Label>
          <Input 
            id='name'
            name='name'
            type='text'
            value={props.reqData.name}
            onChange={(e) => handleInputChange(e, props.setReqData)}
            className='ml-2 w-[40%]'
            required
          />
        </div>
      </DataForm>
    </>
  );
};

export default ProvinceForm;
