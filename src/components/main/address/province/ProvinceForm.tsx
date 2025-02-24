'use client';

import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import Input from '@/components/partial/form/Input';
import Label from '@/components/partial/form/Label';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { initIsValids } from '@/lib/client/isValidForm';
import { ProvinceType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type ProvinceFormProps = {
  reqData: ProvinceType;
  setReqData: React.Dispatch<React.SetStateAction<ProvinceType>>;
} & Omit<DataFormProps, 'children' | 'cancelOnClick' | 'isValids'>;

const INPUT_NUM = 1;

const ProvinceForm = (props: ProvinceFormProps) => {
  const router = useRouter();
  const [isValids, setIsValids] = useState<boolean[]>([]);

  useEffect(() => {
    setIsValids(initIsValids(INPUT_NUM));
  }, []);

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push('/addresses/provinces');
    });
  };

  return (
    <>
      <DataForm 
        formLabel={props.formLabel}
        isValids={isValids}
        saveOnClick={props.saveOnClick}
        saveAndExitOnClick={props.saveAndExitOnClick}
        cancelOnClick={cancelOnClick}
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
            onChange={(e) => handleInputChange(e, props.setReqData)}
            validator={{
              validate: () => { return null; },
              setIsValids: setIsValids,
              isValidIndex: 0
            }}
          />
        </div>
      </DataForm>
    </>
  );
};

export default ProvinceForm;
