'use client';

import React, { useState, useEffect } from 'react';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ResetPasswordRequestBeforeType } from '@/types/UserAccount.type';
import { Input } from '@/components/partial/form/Input';
import { Form } from '@/components/partial/form/Form';
import { authService } from '@/services/UserAccount.service';
import { toastError } from '@/lib/client/alert';
import { INITIAL_RESET_PASSWORD_REQUEST_BEFORE } from '@/initials/UserAccount.initial';
import { AuthMessage } from '@/messages/UserAccount.message';
import { EMAIL_REG_EXP, isValidForm } from '@/lib/client/isValidForm';
import { Validators } from '@/types/Validators.type';

const INITIAL_COUNTDOWN = 5;

export const ResetPasswordBefore = () => {
  const [reqData, setReqData] = useState<ResetPasswordRequestBeforeType>(INITIAL_RESET_PASSWORD_REQUEST_BEFORE);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const [buttonText, setButtonText] = useState('Gửi'); 
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN); 

  useEffect(() => {
    let timer = setInterval(() => {}, 0);

    if (isButtonDisabled) {
      if (countdown > 0) {
        setButtonText(`Gửi lại sau ${countdown} giây`);
        timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000); 
      } else {
        clearInterval(timer); 
        setIsButtonDisabled(false); 
        setButtonText('Gửi lại'); 
        setCountdown(INITIAL_COUNTDOWN);
      }
    }

    return () => clearInterval(timer);
  }, [isButtonDisabled, countdown]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, setReqData);
  };
  
  const validators: Validators<ResetPasswordRequestBeforeType> = {
    email: () => {
      if (!reqData.email) {
        return AuthMessage.EMAIL_REQUIRED;
      }
      if (!EMAIL_REG_EXP.test(reqData.email ?? '')) {
        return AuthMessage.EMAIL_FORMAT_ERROR;
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

    setIsButtonDisabled(true);

    try {      
      await authService.getResetPasswordURL(reqData);
    } catch {
      await toastError(AuthMessage.RESET_PASSWORD_URL_ERROR);
    }

    setCountdown(INITIAL_COUNTDOWN);
  };


  return (
    <Form label='Đặt lại mật khẩu' onSubmit={handleSubmit} useModal>
      <div>
        <Input 
          id='email'
          name='email'
          type='text'
          placeholder='Email'
          value={reqData.email}
          onChange={handleOnChange}
          validate={validators.email}
        />
      </div>
      <div>
        <p className='italic text-gray-500 text-sm'>
          Vui lòng truy cập vào email của bạn để lấy liên kết xác nhận mật khẩu
        </p>
      </div>

      <div className='flex justify-center'>
        <button 
          type='submit' 
          className={`font-semibold p-2 w-[50%] mt-4 text-white rounded-lg ${
            isButtonDisabled 
            ? 'bg-gray-300 cursor-not-allowed disabled' 
            : 'bg-mygreen hover:bg-mydarkgreen transition duration-300 ease-in-out' 
          }`}
          disabled={isButtonDisabled} 
        >
          {buttonText} 
        </button>
      </div>
    </Form>
  );
};