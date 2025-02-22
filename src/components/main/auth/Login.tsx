'use client';

import React, { useState } from 'react';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/lib/client/authToken';
import { LoginRequestType } from '@/types/UserAccount.type';
import Input from '@/components/partial/form/Input';
import Form from '@/components/partial/form/Form';
import { AuthService } from '@/services/UserAccount.service';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginRequestType>({
    email: '',
    password: ''
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await (new AuthService()).login(loginData);
      alert(JSON.stringify(data));
      await handleLogin(data);
      router.replace('/');
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <Form label='Trang quản lý' className='w-[300px]' onSubmit={handleSubmit} useModal>
      <div>
        <Input 
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={loginData.email}
          onChange={(e) => handleInputChange(e, setLoginData)}
          required
        />
      </div>

      <div>
        <Input 
          id='password'
          name='password'
          type='password'
          placeholder='Mật khẩu'
          value={loginData.password}
          onChange={(e) => handleInputChange(e, setLoginData)}
          required
        />
      </div>

      <div>
        <Link href={'/auth/reset-password'} className='underline text-blue-500 text-left'>Quên mật khẩu?</Link>
      </div>

      <div className='flex justify-center'>
        <button type='submit' className='font-semibold p-2 w-[50%] mt-2 text-white bg-mygreen rounded-lg 
                                          hover:bg-mydarkgreen transition duration-300 ease-in-out'>
          Đăng nhập
        </button>
      </div>
    </Form>
  );
};

export default Login;