'use client';

import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { useInputRefs } from '@/hooks/useInputRefs';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import React from 'react';

type ProvinceFormProps = {
  reqData: ProvinceType;
  setReqData: React.Dispatch<React.SetStateAction<ProvinceType>>;
} & Omit<DataFormProps, 'children' | 'cancelOnClick' | 'inputRefs'>;

export const ProvinceForm = (props: ProvinceFormProps) => {
  const router = useRouter();
  const { inputRefs, setRef } = useInputRefs(Object.keys(props.reqData));

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push('/addresses/provinces');
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };

  const validators = {
    name: () => null
  };

  return (
    <>
      <DataForm 
        formLabel={props.formLabel}
        saveOnClick={props.saveOnClick}
        saveAndExitOnClick={props.saveAndExitOnClick}
        cancelOnClick={cancelOnClick}
        inputRefs={inputRefs}
      >
        <div className='flex items-center space-x-2'>
          <Label htmlFor='name' required>Tên tỉnh: </Label>
          <Input 
            id='name'
            name='name'
            type='text'
            className='w-[300px]'
            required
            value={props.reqData.name}
            onChange={handleOnChange}
            validate={validators.name}
            ref={setRef('name')}
          />
        </div>
      </DataForm>
    </>
  );
};
