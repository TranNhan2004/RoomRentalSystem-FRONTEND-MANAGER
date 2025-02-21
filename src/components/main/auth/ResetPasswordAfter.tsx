'use client';

import React, { useState } from 'react';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ResetPasswordRequestAfterType } from '@/types/UserAccount';
import Input from '@/components/partial/form/Input';
import Form from '@/components/partial/form/Form';
import { AuthService } from '@/services/UserAccount';
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from '@/lib/client/alert';


type ResetPasswordAfterProps = {
  uidb64: string;
  token: string;
}

const ResetPasswordAfter = (props: ResetPasswordAfterProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ResetPasswordRequestAfterType>({
    new_password: '',
    confirm_new_password: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reqData.new_password !== reqData.confirm_new_password) {
      await toastError('Mật khẩu nhập lại không khớp!');
      return;
    }

    try {
      await (new AuthService()).resetPassword(reqData, props.uidb64, props.token);
      await toastSuccess('Mật khẩu đã được thay đổi thành công!');
      router.push('/auth/login');
    } catch {
      await toastError('Đã có lỗi xảy ra!');
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
          onChange={(e) => handleInputChange(e, setReqData)}
          required
        />
      </div>

      <div>
        <Input 
          id='confirm-new-password'
          name='confirm_new_password'
          type='password'
          placeholder='Nhập lại mật khẩu mới'
          value={reqData.confirm_new_password}
          onChange={(e) => handleInputChange(e, setReqData)}
          required
        />
      </div>

      <div className='flex justify-center'>
        <button 
          type='submit' 
          className='font-semibold p-2 w-[50%] mt-4 text-white rounded-lg bg-mygreen 
                      hover:bg-mydarkgreen transition duration-300 ease-in-out' 
        >
          Cập nhật 
        </button>
      </div>
    </Form>
  );
};

export default ResetPasswordAfter;
