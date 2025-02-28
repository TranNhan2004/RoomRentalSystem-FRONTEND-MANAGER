'use client';

import React, { useState } from 'react';
import { DataForm } from '@/components/partial/data/DataForm';
import { useInputRefs } from '@/hooks/useInputRefs';
import { ChangePasswordType } from '@/types/UserAccount.type';
import { INITIAL_CHANGE_PASSWORD } from '@/initials/UserAccount.initial';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/partial/form/Label';
import { Input } from '@/components/partial/form/Input';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { PASSWORD_REG_EXP } from '@/lib/client/isValidForm';
import { AuthMessage, UserMessage } from '@/messages/UserAccount.message';
import { getMyInfo, resetAuthTokens } from '@/lib/client/authToken';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { UserService } from '@/services/UserAccount.service';


const ChangePassword = () => {
  const router = useRouter();
  const [data, setData] = useState<ChangePasswordType>(INITIAL_CHANGE_PASSWORD);
  const { inputRefs, setRef } = useInputRefs(Object.keys(INITIAL_CHANGE_PASSWORD));

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, setData);
  };

  const handleSave = async () => {
    try {
      const { id } = await getMyInfo();
      await (new UserService()).changePassword({ ...data, id: id });
      await toastSuccess(UserMessage.CHANGE_PASSWORD_SUCCESS);
      await resetAuthTokens();
      router.refresh();

    } catch {
      await toastError(UserMessage.CHANGE_PASSWORD_ERROR);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  const validators = {
    old_password: () => null,
    new_password: () => {
      if (!PASSWORD_REG_EXP.test(data.new_password ?? '')) {
        return AuthMessage.PASSWORD_INPUT_ERROR;
      }
      return null;
    },
    confirm_new_password: () => {
      if (data.confirm_new_password !== data.new_password) {
        return AuthMessage.CONFIRM_PASSWORD_INPUT_NOT_MATCH;
      }
      return null;
    }
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

export default ChangePassword;
