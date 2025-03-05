'use client';

import React, { useState } from 'react';
import { DataForm } from '@/components/partial/data/DataForm';
import { ChangePasswordType } from '@/types/UserAccount.type';
import { INITIAL_CHANGE_PASSWORD } from '@/initials/UserAccount.initial';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/partial/form/Label';
import { Input } from '@/components/partial/form/Input';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { PASSWORD_REG_EXP } from '@/lib/client/isValidForm';
import { AuthMessage } from '@/messages/UserAccount.message';
import { getMyInfo, resetAuthTokens } from '@/lib/client/authToken';
import { handleCancelAlert, toastError, toastSuccess } from '@/lib/client/alert';
import { userService } from '@/services/UserAccount.service';
import { Validators } from '@/types/Validators.type';


const ChangePassword = () => {
  const router = useRouter();
  const [data, setData] = useState<ChangePasswordType>(INITIAL_CHANGE_PASSWORD);

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, setData);
  };

  const handleSave = async () => {
    try {
      const { id } = await getMyInfo();
      await userService.changePassword(id ?? '', data);
      await toastSuccess(AuthMessage.CHANGE_PASSWORD_SUCCESS);
      await resetAuthTokens();
      router.refresh();

    } catch {
      await toastError(AuthMessage.CHANGE_PASSWORD_ERROR);
    }
  };

  const handleCancel = async () => {
    await handleCancelAlert(() => router.push('/profile'));
  };

  const validators: Validators<ChangePasswordType> = {
    old_password: () => {
      if (!data.old_password) {
        return AuthMessage.OLD_PASSWORD_REQUIRED;
      }
      return null;
    },

    new_password: () => {
      if (!PASSWORD_REG_EXP.test(data.new_password ?? '')) {
        return AuthMessage.NEW_PASSWORD_REQUIRED;
      }
      if (data.new_password === data.old_password) {
        return AuthMessage.CHANGE_PASSWORD_DUPLICATED;
      }
      return null;
    },

    confirm_new_password: () => {
      if (!data.confirm_new_password) {
        return AuthMessage.CONFIRM_PASSWORD_REQUIRED;
      }
      if (data.confirm_new_password !== data.new_password) {
        return AuthMessage.CONFIRM_PASSWORD_MISMATCH;
      }
      return null;
    }
  };

  return (
    <DataForm
      formLabel='Thay đổi mật khẩu'
      saveOnClick={handleSave}
      cancelOnClick={handleCancel}
      validators={validators}
    >
      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='old-password' required>Mật khẩu cũ: </Label>
        <Input 
          id='old-password'
          name='old_password'
          type='password'
          className='w-[300px] ml-[-300px]'
          value={data.old_password}
          onChange={handleInputOnChange}
          validate={validators.old_password}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='new-password' required>Mật khẩu mới: </Label>
        <Input 
          id='new-password'
          name='new_password'
          type='password'
          className='w-[300px] ml-[-300px]'
          value={data.new_password}
          onChange={handleInputOnChange}
          validate={validators.new_password}
        />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label htmlFor='confirm-new-password' required>Nhập lại mật khẩu mới: </Label>
        <Input 
          id='confirm-new-password'
          name='confirm_new_password'
          type='password'
          className='w-[300px] ml-[-300px]'
          value={data.confirm_new_password}
          onChange={handleInputOnChange}
          validate={validators.confirm_new_password}
        />
      </div>

    </DataForm>
  );
};

export default ChangePassword;
