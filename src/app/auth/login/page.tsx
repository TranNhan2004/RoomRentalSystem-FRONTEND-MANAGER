'use client';

import React, { useEffect, useState } from 'react';
import Form from '@/components/form/Form';
import Input from '@/components/form/Input';


export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Email or phone:', emailOrPhone);
    console.log('Password:', password);
  };

  useEffect(() => {
    document.title = "Management | Login";
  }, []);

  return (
    <Form label='Room Rental Management' onSubmit={handleSubmit}>
      <div>
        <Input 
          id='email-or-phone'
          name='emailOrPhone'
          type='text'
          placeholder='Email hoặc Số điện thoại'
          value={emailOrPhone}
          onChange={e => setEmailOrPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <Input 
          id='password'
          name='password'
          type='password'
          placeholder='Mật khẩu'
          value={password}
          onChange={e => setPassword(e.target.value)}
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