'use client';

import React, { useState } from 'react';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ResetPasswordRequestAfterType } from '@/types/UserAccount.type';
import { authService } from '@/services/UserAccount.service';
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { INITIAL_RESET_PASSWORD_REQUEST_AFTER } from '@/initials/UserAccount.initial';
import { isValidForm, PASSWORD_REG_EXP } from '@/lib/client/isValidForm';
import { AuthMessage } from '@/messages/UserAccount.message';
import { Form } from '@/components/partial/form/Form';
import { Input } from '@/components/partial/form/Input';
import { Spin } from '@/components/partial/data/Spin';
import { Validators } from '@/types/Validators.type';


type ResetPasswordURLProps = {
  uidb64: string;
  token: string;
}

export const ResetPasswordAfter = (props: ResetPasswordURLProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ResetPasswordRequestAfterType>(INITIAL_RESET_PASSWORD_REQUEST_AFTER);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, setReqData);
  };

  const validators: Validators<ResetPasswordRequestAfterType> = {
    new_password: () => {
      if (!reqData.new_password) {
        return AuthMessage.NEW_PASSWORD_REQUIRED;
      }
      if (!PASSWORD_REG_EXP.test(reqData.new_password)) {
        return AuthMessage.PASSWORD_FORMAT_ERROR;
      }
      return null;
    },

    confirm_new_password: () => {
      if (!reqData.confirm_new_password) {
        return AuthMessage.CONFIRM_PASSWORD_REQUIRED;
      }
      if (reqData.confirm_new_password !== reqData.new_password) {
        return AuthMessage.CONFIRM_PASSWORD_MISMATCH;
      }
      return null;
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await isValidForm(validators);
    if (!isValid) {
      return;
    }

    setIsSubmitted(true);

    try {
      await authService.resetPassword(reqData, props.uidb64, props.token);
      await toastSuccess(AuthMessage.RESET_PASSWORD_SUCCESS);
      router.push('/auth/login');
      
    } catch {
      await toastError(AuthMessage.RESET_PASSWORD_ERROR);
      setIsSubmitted(false);
    }
  };


  return (
    <Form label='Đặt lại mật khẩu' className='w-[300px]' onSubmit={handleSubmit} useModal>
      <div>
        <Input
          id='new-password'
          name='new_password'
          type='password'
          placeholder='Mật khẩu mới'
          value={reqData.new_password}
          onChange={handleInputOnChange}
          validate={validators.new_password}
        />
      </div>

      <div>
        <Input
          id='confirm-new-password'
          name='confirm_new_password'
          type='password'
          placeholder='Nhập lại mật khẩu mới'
          value={reqData.confirm_new_password}
          onChange={handleInputOnChange}
          validate={validators.confirm_new_password}
        />
      </div>

      <div className='flex justify-center'>
        <button type='submit' className={`font-semibold p-2 w-[50%] mt-2 text-white rounded-lg
                                          ${isSubmitted ? 
                                            'bg-mydarkgreen cursor-not-allowed disabled' : 
                                            'bg-mygreen hover:bg-mydarkgreen transition duration-300 ease-in-out'}`}>
          {isSubmitted ? <Spin /> : 'Cập nhật'}
        </button>
      </div>
    </Form>
  );
};
