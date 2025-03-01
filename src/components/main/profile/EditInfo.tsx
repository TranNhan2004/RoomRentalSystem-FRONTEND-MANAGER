'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInputRefs } from '@/hooks/useInputRefs';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { getMyInfo, setMyInfo } from '@/lib/client/authToken';
import { UserType } from '@/types/UserAccount.type';
import { INITIAL_USER } from '@/initials/UserAccount.initial';
import { userService } from '@/services/UserAccount.service';
import { UserMessage } from '@/messages/UserAccount.message';
import { handleCancelAlert, toastError, toastSuccess } from '@/lib/client/alert';

const EditInfo = () => {
  const router = useRouter();
  const [data, setData] = useState<UserType>(INITIAL_USER);
  const { inputRefs, setRef } = useInputRefs(Object.keys(INITIAL_USER));

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, setData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyInfo();
        setData(data);

      } catch {
        await toastError(UserMessage.GET_BY_ID_ERROR);
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
      await toastError(UserMessage.CHANGE_PASSWORD_ERROR);
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

  const validators = {
    
  };

  return (
    <DataForm
      formLabel='Thay đổi mật khẩu'
      inputRefs={inputRefs}
      saveOnClick={handleSave}
      cancelOnClick={handleCancel}
    >
      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='old-password' required>Mật khẩu cũ: </Label>
        <Input 
          id='old-password'
          name='old_password'
          type='password'
          className='w-[300px] ml-[-300px]'
          required
          value={data.old_password}
          onChange={handleInputOnChange}
          validate={validators.old_password}
          ref={setRef('old_password')}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='new-password' required>Mật khẩu mới: </Label>
        <Input 
          id='new-password'
          name='new_password'
          type='password'
          className='w-[300px] ml-[-300px]'
          required
          value={data.new_password}
          onChange={handleInputOnChange}
          validate={validators.new_password}
          ref={setRef('new_password')}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='confirm-new-password' required>Nhập lại mật khẩu mới: </Label>
        <Input 
          id='confirm-new-password'
          name='confirm_new_password'
          type='password'
          className='w-[300px] ml-[-300px]'
          required
          value={data.confirm_new_password}
          onChange={handleInputOnChange}
          validate={validators.confirm_new_password}
          ref={setRef('confirm_new_password')}
        />
      </div>

    </DataForm>
  );
};

export default EditInfo;
