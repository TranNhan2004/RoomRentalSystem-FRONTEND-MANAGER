'use client';

import React, { useEffect, useState } from 'react';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/lib/client/authToken';
import { LoginRequestType } from '@/types/UserAccount.type';
import Input from '@/components/partial/form/Input';
import Form from '@/components/partial/form/Form';
import { AuthService } from '@/services/UserAccount.service';
import Link from 'next/link';
import { toastError } from '@/lib/client/alert';
import { AuthMessage } from '@/messages/UserAccount.message';
import { INITIAL_LOGIN_REQUEST } from '@/initials/UserAccount.initial';
import { allTrue, EMAIL_REG_EXP, initIsValids, PASSWORD_REG_EXP } from '@/lib/client/isValidForm';
import Spin from '@/components/partial/data/Spin';

const INPUT_NUM = 2;

const Login = () => {
  const router = useRouter();
  const [reqData, setReqData] = useState<LoginRequestType>(INITIAL_LOGIN_REQUEST);
  const [isValids, setIsValids] = useState<boolean[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setIsValids(initIsValids(INPUT_NUM));
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allTrue(isValids)) {
      return;
    }
    
    setIsSubmitted(true);
    
    try {
      const data = await (new AuthService()).login(reqData);
      await handleLogin(data);
      router.replace('/');
    } catch {
      await toastError(AuthMessage.LOGIN_ERROR);
      setIsSubmitted(false);
    }
  };

  const emailValidate = () => {
    if (!EMAIL_REG_EXP.test(reqData.email ?? '')) {
      return AuthMessage.EMAIL_INPUT_ERROR;
    }
    return null;
  };
  
  const passwordValidate = () => {
    if (!PASSWORD_REG_EXP.test(reqData.password ?? '')) {
      return AuthMessage.PASSWORD_INPUT_ERROR;
    }
    return null;
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
          onChange={(e) => handleInputChange(e, setReqData)}
          validator={{
            validate: emailValidate,
            setIsValids: setIsValids,
            isValidIndex: 0
          }}
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
          onChange={(e) => handleInputChange(e, setReqData)}
          validator={{
            validate: passwordValidate,
            setIsValids: setIsValids,
            isValidIndex: 1
          }}
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

export default Login;