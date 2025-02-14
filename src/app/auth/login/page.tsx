'use client';

import React, { useEffect, useState } from 'react';
import Form from '@/components/form/Form';
import Input from '@/components/form/Input';
import AuthService from '@/services/user-account/Auth.service';
import { LoginRequestType } from '@/interfaces/user-account/Login.interface';
import { handleInputChange } from '@/lib/handleInputChange';


export default function LoginPage() {
  const [loginData, setLoginData] = useState<LoginRequestType>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await AuthService.login(loginData);
      localStorage.setItem('mananger_access_token', data.accessToken ?? '');
      localStorage.setItem('manager_id', data.id ?? '');
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    document.title = "Management | Login";
  }, []);

  return (
    <Form label='Room Rental Management' onSubmit={handleSubmit}>
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

      <div className='flex justify-center'>
        <button type='submit' className='font-semibold p-2 w-[50%] mt-4 text-white bg-mygreen rounded-lg 
                                          hover:bg-mydarkgreen transition duration-300 ease-in-out'>
          Đăng nhập
        </button>
      </div>
    </Form>
  );
}