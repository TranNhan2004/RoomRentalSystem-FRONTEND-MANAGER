'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DataForm, DataFormProps } from '@/components/partial/data/DataForm';
import { Input } from '@/components/partial/form/Input';
import { Label } from '@/components/partial/form/Label';
import { OptionType, Select } from '@/components/partial/form/Select';
import { handleCancelAlert } from '@/lib/client/alert';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { mapOptions } from '@/lib/client/handleOptions';
import { CommuneMessage } from '@/messages/Address.message';
import { districtService, provinceService } from '@/services/Address.service';
import { CommuneType, DistrictType } from '@/types/Address.type';
import { useRouter } from 'next/navigation';
import { Validators } from '@/types/Validators.type';


type CommuneFormProps = {
  reqData: CommuneType;
  setReqData: React.Dispatch<React.SetStateAction<CommuneType>>;
} & Omit<DataFormProps<CommuneType>, 'children' | 'cancelOnClick' | 'validators'>;

export const CommuneForm = (props: CommuneFormProps) => {
  const router = useRouter();
  const [provinceOptions, setProvinceOptions] = useState<OptionType[]>([]);
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);
  const originalDistrictDataRef = useRef<DistrictType[]>([]);
  
  useEffect(() => {
    const fetchOptionData = async () => {
      const [provinceData, districtData] = await Promise.all([
        provinceService.getMany(),
        districtService.getMany()
      ]);

      setProvinceOptions(mapOptions(provinceData, ['name'], 'id'));
      setDistrictOptions(mapOptions(districtData, ['name'], 'id'));
      originalDistrictDataRef.current = districtData;

      if (props.reqData.district) {
        const district = districtData.find(item => item.id === props.reqData.district);
        const districts = districtData.filter(item => item.province === district?.province);
        setDistrictOptions(mapOptions(districts, ['name'], 'id'));
      
      } else {
        setDistrictOptions(mapOptions(districtData, ['name'], 'id'));
      } 
    };

    fetchOptionData();
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
    props.setReqData({ ...props.reqData, _province: e.target.value });
    if (e.target.value == '') {
      setDistrictOptions(mapOptions(originalDistrictDataRef.current, ['name'], 'id'));
    } else {
      const districts = originalDistrictDataRef.current.filter(
        district => district.province === e.target.value
      );
      setDistrictOptions(mapOptions(districts, ['name'], 'id'));
    }
  };
  
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setReqData({ ...props.reqData, district: e.target.value });
  };
  
  const validators: Validators<CommuneType> = {
    name: () => {
      if (!props.reqData.name) {
        return CommuneMessage.NAME_REQUIRED;
      } 
      return null;
    },
    
    district: () => {
      if (!props.reqData.district) {
        return CommuneMessage.DISTRICT_REQUIRED;
      }
      return null;
    },

    _province: () => {
      if (!props.reqData._province) {
        return CommuneMessage.PROVINCE_REQUIRED;
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
          <Label htmlFor='name' required>Tên xã/phường/thị trấn: </Label>
          <Input 
            id='name'
            name='name'
            type='text'
            className='w-[300px] ml-[-250px]'
            value={props.reqData.name}
            onChange={handleInputOnChange}
            validate={validators.name}
          />
        </div>

        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='province' required>Thuộc tỉnh/thành phố: </Label>
          <Select 
            id='province'
            value={props.reqData._province}
            className='w-[300px] ml-[-250px]'
            options={provinceOptions}
            onChange={handleProvinceChange}
            validate={validators._province}
          />
        </div>
        
        <div className='grid grid-cols-2 items-center'>
          <Label htmlFor='district' required>Thuộc huyện/quận/thị xã: </Label>
          <Select 
            id='district'
            value={props.reqData.district}
            className='w-[300px] ml-[-250px]'
            options={districtOptions}
            onChange={handleDistrictChange}
            validate={validators.district}
          />
        </div>
      </DataForm>
    </>
  );
};
