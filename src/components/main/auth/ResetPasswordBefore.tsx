'use client';

import React, { useState, useEffect } from 'react';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ResetPasswordRequestBeforeType } from '@/types/UserAccount';
import Input from '@/components/partial/form/Input';
import Form from '@/components/partial/form/Form';
import { AuthService } from '@/services/UserAccount';

const INITIAL_COUNTDOWN = 60;

const ResetPasswordBefore = () => {
  const [reqData, setReqData] = useState<ResetPasswordRequestBeforeType>({ email: '' });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsButtonDisabled(true);

    try {      
      await (new AuthService()).generateURLForResetPassword(reqData);
    } catch {
      alert('Đã có lỗi xảy ra');
    }

    setCountdown(INITIAL_COUNTDOWN);
  };


  return (
    <Form label='Đặt lại mật khẩu' onSubmit={handleSubmit}>
      <div>
        <Input 
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={reqData.email}
          onChange={(e) => handleInputChange(e, setReqData)}
          required
        />
      </div>
      <div>
        <p className='italic text-gray-500 text-sm'>Vui lòng truy cập vào email của bạn để lấy liên kết xác nhận mật khẩu</p>
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
