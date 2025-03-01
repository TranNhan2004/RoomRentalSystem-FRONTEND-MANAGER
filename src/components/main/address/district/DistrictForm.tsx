'use client';

import React, { useEffect, useState } from 'react';
import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { OptionType, Select } from '@/components/partial/form/Select';
import { useInputRefs } from '@/hooks/useInputRefs';
import { handleCancelAlert, toastError } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { mapOptions } from '@/lib/client/handleOptions';
import { DistrictMessage } from '@/messages/Address.message';
import { provinceService } from '@/services/Address.service';
import { DistrictType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';

type DistrictFormProps = {
  reqData: DistrictType;
  setReqData: React.Dispatch<React.SetStateAction<DistrictType>>;
} & Omit<DataFormProps, 'children' | 'cancelOnClick' | 'inputRefs'>;

export const DistrictForm = (props: DistrictFormProps) => {
  const router = useRouter();
  const { inputRefs, setRef } = useInputRefs(Object.keys(props.reqData));
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const fetchOptionData = async () => {
      try {
        const provinceData = await provinceService.getMany();
        setProvinceOptions(mapOptions(provinceData, 'name', 'id'));
      
      } catch {
        await toastError(DistrictMessage.GET_BY_ID_ERROR);
      }
    };

    fetchOptionData();
  }, []);

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push('/addresses/districts');
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    props.setReqData({ ...props.reqData, province: e.target.value });
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
            onChange={handleInputOnChange}
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
            onChange={handleProvinceChange}
            required
          />
        </div>
      </DataForm>
    </>
  );
};
