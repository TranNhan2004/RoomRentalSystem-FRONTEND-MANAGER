'use client';

import React, { useState, useEffect } from 'react';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ResetPasswordRequestBeforeType } from '@/types/UserAccount.type';
import Input from '@/components/partial/form/Input';
import Form from '@/components/partial/form/Form';
import { AuthService } from '@/services/UserAccount.service';
import { toastError } from '@/lib/client/alert';
import { INITIAL_RESET_PASSWORD_REQUEST_BEFORE } from '@/initials/UserAccount.initial';
import { AuthMessage } from '@/messages/UserAccount.message';
import { allTrue, EMAIL_REG_EXP, initIsValids } from '@/lib/client/isValidForm';

const INITIAL_COUNTDOWN = 60;
const INPUT_NUM = 1;

const ResetPasswordBefore = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const [buttonText, setButtonText] = useState('Gửi'); 
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN); 
  const [reqData, setReqData] = useState<ResetPasswordRequestBeforeType>(INITIAL_RESET_PASSWORD_REQUEST_BEFORE);
  const [isValids, setIsValids] = useState<boolean[]>([]);

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

    setIsValids(initIsValids(INPUT_NUM));

    return () => clearInterval(timer);
  }, [isButtonDisabled, countdown]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allTrue(isValids)) {
      return;
    }

    setIsButtonDisabled(true);

    try {      
      await (new AuthService()).getResetPasswordURL(reqData);
    } catch {
      await toastError(AuthMessage.GET_RESET_PASSWORD_URL_ERROR);
    }

    setCountdown(INITIAL_COUNTDOWN);
  };


  const emailValidate = () => {
    if (!EMAIL_REG_EXP.test(reqData.email ?? '')) {
      return AuthMessage.EMAIL_INPUT_ERROR;
    }
    return null;
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
          onChange={(e) => handleInputChange(e, setReqData)}
          required
          validator={{
            validate: emailValidate,
            setIsValids: setIsValids,
            isValidIndex: 0
          }}
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
            ? 'bg-gray-300' 
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

export default ResetPasswordBefore;
