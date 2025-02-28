'use client';

import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { OptionType, Select } from '@/components/partial/form/Select';
import { useInputRefs } from '@/hooks/useInputRefs';
import { handleCancelAlert, toastError } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { mapOptions } from '@/lib/client/handleOptions';
import { ProvinceMessage } from '@/messages/Address.message';
import { DistrictService, ProvinceService } from '@/services/Address.service';
import { CommuneType, DistrictType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type CommuneFormProps = {
  reqData: CommuneType;
  setReqData: React.Dispatch<React.SetStateAction<CommuneType>>;
} & Omit<DataFormProps, 'children' | 'cancelOnClick' | 'inputRefs'>;

export const CommuneForm = (props: CommuneFormProps) => {
  const router = useRouter();

  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);
  const [provinceValue, setProvinceValue] = useState('');
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);

  const { inputRefs, setRef } = useInputRefs(Object.keys(props.reqData));
  const originalDistrictDataRef = useRef<DistrictType[]>([]);
  
  useEffect(() => {
    const fetchOptionData = async () => {
      try {
        const [provinceData, districtData] = await Promise.all([
          (new ProvinceService()).getMany(),
          (new DistrictService()).getMany()
        ]);

        setProvinceOptions(mapOptions(provinceData, 'name', 'id'));
        setDistrictOptions(mapOptions(districtData, 'name', 'id'));
      
      } catch {
        await toastError(ProvinceMessage.GET_MANY_ERROR);
      }
    };

    fetchOptionData();
  }, []);

  useEffect(() => {
    if (props.reqData.district === '') {
      setProvinceValue('');
    } else {
      const district = originalDistrictDataRef.current.find(item => item.id === props.reqData.district);
      setProvinceValue(district?.province ?? '');
    }
    
  }, [props.reqData.district]);

  const cancelOnClick = async () => {
    await handleCancelAlert(() => {
      router.push('/addresses/communes');
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, props.setReqData);
  };
  

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setProvinceValue(e.target.value);
      if (e.target.value == '') {
        setDistrictOptions(mapOptions(originalDistrictDataRef.current, 'name', 'id'));
      } else {
        const districts = originalDistrictDataRef.current.filter(
          district => district.province === e.target.value
        );
        setDistrictOptions(mapOptions(districts, 'name', 'id'));
      }
    };
  
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setReqData({ ...props.reqData, district: e.target.value });
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
          <Label htmlFor='name' required>Tên xã: </Label>
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
            value={provinceValue}
            className='w-[300px] ml-[-360px]'
            options={provinceOptions}
            onChange={handleProvinceChange}
          />
        </div>
        
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='district' required>Thuộc huyện: </Label>
          <Select 
            id='district'
            value={props.reqData.district}
            className='w-[300px] ml-[-360px]'
            options={districtOptions}
            onChange={handleDistrictChange}
          />
        </div>
      </DataForm>
    </>
  );
};
