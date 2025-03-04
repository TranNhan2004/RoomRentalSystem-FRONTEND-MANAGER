'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { getMyInfo, setMyInfo } from '@/lib/client/authToken';
import { UserType } from '@/types/UserAccount.type';
import { INITIAL_USER } from '@/initials/UserAccount.initial';
import { userService } from '@/services/UserAccount.service';
import { AuthMessage, UserMessage } from '@/messages/UserAccount.message';
import { handleCancelAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { Validators } from '@/types/Validators.type';
import { DataForm } from '@/components/partial/data/DataForm';
import { Label } from '@/components/partial/form/Label';
import { Input } from '@/components/partial/form/Input';
import { EMAIL_REG_EXP } from '@/lib/client/isValidForm';
import { formatDate } from '@/lib/client/formatDate';
import { Select } from '@/components/partial/form/Select';
import { dateStrOfMaxAge, dateStrOfMinAge } from '@/lib/client/dateLimit';

const EditInfo = () => {
  const router = useRouter();
  const [data, setData] = useState<UserType>(INITIAL_USER);

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, setData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyInfo();
        setData(data);

      } catch {
        await toastError(UserMessage.GET_ERROR);
      }
    };

    fetchData();
  }, []);


  const patchData = async (actionAfter?: () => void) => {
    try {
      await userService.patch(data.id ?? '', data);
      await setMyInfo(data);
      await toastSuccess(UserMessage.PATCH_SUCCESS);
      actionAfter?.();
    
    } catch {
      await toastError(UserMessage.PATCH_ERROR);
    }
  };

  const handleSave = async () => {
    await patchData();
  };

  const handleSaveAndExit = async () => {
    await patchData(() => router.push('/profile'));
  };

  const handleCancel = async () => {
    await handleCancelAlert(() => router.push('/profile'));
  };

  const validators: Validators<UserType> = {
    email: () => {
      if (!data.email) {
        return AuthMessage.EMAIL_REQUIRED;
      }

      if (!EMAIL_REG_EXP.test(data.email)) {
        return AuthMessage.EMAIL_FORMAT_ERROR;
      }
      return null;
    },

    last_name: () => {
      if (!data.last_name) {
        return UserMessage.LAST_NAME_REQUIRED;
      }
      return null;
    },

    first_name: () => {
      if (!data.first_name) {
        return UserMessage.FIRST_NAME_REQUIRED;
      }
      return null;
    },

    phone_number: () => {
      if (!data.phone_number) {
        return UserMessage.PHONE_NUMBER_REQUIRED;
      }
      if (data.phone_number.length !== 10) {
        return UserMessage.PHONE_NUMBER_FORMAT_ERROR;
      }
      return null;
    },

    citizen_number: () => {
      if (!data.citizen_number) {
        return UserMessage.CITIZEN_NUMBER_REQUIRED;
      }
      if (data.citizen_number.length !== 12) {
        return UserMessage.CITIZEN_NUMBER_FORMAT_ERROR;
      }
      return null;
    },

    gender: () => {
      if (!data.gender) {
        return UserMessage.GENDER_REQUIRED;
      }
      return null;
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, gender: e.target.value as UserType['gender'] });
  };

  return (
    <DataForm
      formLabel='Chỉnh sửa thông tin cá nhân'
      saveOnClick={handleSave}
      saveAndExitOnClick={handleSaveAndExit}
      cancelOnClick={handleCancel}
      validators={validators}
    >
      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='email' required>Email: </Label>
        <Input 
          id='email'
          name='email'
          type='text' 
          className='w-[300px] ml-[-300px]'
          value={data.email}
          onChange={handleInputOnChange}
          validate={validators.email}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='last-name' required>Họ: </Label>
        <Input 
          id='last-name'
          name='last_name'
          type='text' 
          className='w-[300px] ml-[-300px]'
          value={data.last_name}
          onChange={handleInputOnChange}
          validate={validators.last_name}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='first-name' required>Tên: </Label>
        <Input 
          id='first-name'
          name='first_name'
          type='text'
          className='w-[300px] ml-[-300px]'
          value={data.first_name}
          onChange={handleInputOnChange}
          validate={validators.first_name}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='phone-number' required>Số điện thoại: </Label>
        <Input 
          id='phone-number'
          name='phone_number'
          type='text'
          className='w-[300px] ml-[-300px]'
          value={data.phone_number}
          onChange={handleInputOnChange}
          validate={validators.phone_number}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='citizen-number' required>Số CCCD: </Label>
        <Input 
          id='citizen-number'
          name='citizen_number'
          type='text'
          className='w-[300px] ml-[-300px]'
          value={data.citizen_number}
          onChange={handleInputOnChange}
          validate={validators.citizen_number}
        />
      </div>
      
      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='gender' required>Giới tính: </Label>
        <Select 
          id='gender'
          value={data.gender}
          options={[
            { label: 'Nam', value: 'MALE'},
            { label: 'Nữ', value: 'FEMALE'},
            { label: 'Không rõ', value: 'UNKNOWN'},
          ]}
          className='w-[300px] ml-[-300px]'
          onChange={handleGenderChange}
          validate={validators.gender}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='date-of-birth'>Ngày sinh: </Label>
        <Input 
          id='date-of-birth'
          name='date_of_birth'
          type='date'
          className='w-[300px] ml-[-300px]'
          value={formatDate(data.date_of_birth, 'ymd')}
          onChange={handleInputOnChange}
          min={dateStrOfMaxAge}
          max={dateStrOfMinAge}
        />
      </div>
      

    </DataForm>
  );
};

export default EditInfo;
