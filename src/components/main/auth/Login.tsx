'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/lib/client/authToken';
import { LoginRequestType } from '@/types/UserAccount.type';
import { authService } from '@/services/UserAccount.service';
import { toastError } from '@/lib/client/alert';
import { AuthMessage } from '@/messages/UserAccount.message';
import { INITIAL_LOGIN_REQUEST } from '@/initials/UserAccount.initial';
import { EMAIL_REG_EXP, isValidatedForm, PASSWORD_REG_EXP } from '@/lib/client/isValidForm';
import { Form } from '@/components/partial/form/Form';
import { Input } from '@/components/partial/form/Input';
import { Spin } from '@/components/partial/data/Spin';
import { useInputRefs } from '@/hooks/useInputRefs';


export const Login = () => {
  const router = useRouter();
  const { inputRefs, setRef } = useInputRefs(Object.keys(INITIAL_LOGIN_REQUEST));
  const [reqData, setReqData] = useState<LoginRequestType>(INITIAL_LOGIN_REQUEST);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleInputChange(e, setReqData);
  };

  const validators = {
    email: () => {
      if (!EMAIL_REG_EXP.test(reqData.email ?? '')) {
        return AuthMessage.EMAIL_INPUT_ERROR;
      }
      return null;
    },
    password: () => {
      if (!PASSWORD_REG_EXP.test(reqData.password ?? '')) {
        return AuthMessage.PASSWORD_INPUT_ERROR;
      }
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidatedForm(inputRefs)) {
      return;
    }
    
    setIsSubmitted(true);
    
    try {
      const data = await authService.login(reqData);
      await handleLogin(data);
      router.replace('/');
    } catch {
      await toastError(AuthMessage.LOGIN_ERROR);
      setIsSubmitted(false);
    }
  };

  return (
    <Form label='Trang quản lý' className='w-[300px]' onSubmit={handleSubmit} useModal>
      <div>
        <Input
          id='email'
          name='email'
          type='text'
          placeholder='Email'
          required
          value={reqData.email}
          onChange={handleInputOnChange}
          validate={validators.email}
          ref={setRef('email')}
        />
      </div>

      <div>
        <Input 
          id='password'
          name='password'
          type='password'
          placeholder='Mật khẩu'
          required
          value={reqData.password}
          onChange={handleInputOnChange}
          validate={validators.password}
          ref={setRef('password')}
        />
      </div>

      <div>
        <Link href={'/auth/reset-password'} className='underline text-blue-500 text-left'>Quên mật khẩu?</Link>
      </div>

      <div className='flex justify-center'>
        <button type='submit' className={`font-semibold p-2 w-[50%] mt-2 text-white rounded-lg
                                          ${isSubmitted ? 
                                            'bg-mydarkgreen cursor-not-allowed disabled' : 
                                            'bg-mygreen hover:bg-mydarkgreen transition duration-300 ease-in-out'}`}>
          {isSubmitted ? <Spin /> : 'Đăng nhập'}
        </button>
      </div>
    </Form>
  );
};