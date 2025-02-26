'use client';

import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { OptionType, Select } from '@/components/partial/form/Select';
import { useInputRefs } from '@/hooks/useInputRefs';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ProvinceService } from '@/services/Address.service';
import { DistrictType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type DistrictFormProps = {
  reqData: DistrictType;
  setReqData: React.Dispatch<React.SetStateAction<DistrictType>>;
} & Omit<DataFormProps, 'children' | 'cancelOnClick' | 'inputRefs'>;

export const DistrictForm = (props: DistrictFormProps) => {
  const router = useRouter();
  const { inputRefs, setRef } = useInputRefs(Object.keys(props.reqData));
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const getProvinceOptions = async () => {
      const provincesList = await (new ProvinceService()).getMany();
      setProvinceOptions(provincesList.map(province => {
        return {
          value: province.id ?? '',
          label: province.name ?? ''
        };
      }));
    };

    getProvinceOptions();
  }, []);

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push('/addresses/districts');
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
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='name' required>Tên huyện: </Label>
          <Input 
            id='name'
            name='name'
            type='text'
            className='w-[300px] ml-[-360px]'
            required
            value={props.reqData.name}
            onChange={handleOnChange}
            validate={validators.name}
            ref={setRef('name')}
          />
        </div>
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='province' required>Thuộc tỉnh: </Label>
          <Select 
            id='province'
            value={props.reqData.province}
            className='w-[300px] ml-[-360px]'
            options={provinceOptions}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { 
              props.setReqData({ ...props.reqData, province: e.target.value });
            }}
          />
        </div>
      </DataForm>
    </>
  );
};
