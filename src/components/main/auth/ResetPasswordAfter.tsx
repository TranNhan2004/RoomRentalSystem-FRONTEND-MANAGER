'use client';

import React, { useEffect, useState } from 'react';
import { handleInputChange } from '@/lib/client/handleInputChange';
import { ResetPasswordRequestAfterType } from '@/types/UserAccount.type';
import Input from '@/components/partial/form/Input';
import Form from '@/components/partial/form/Form';
import { AuthService } from '@/services/UserAccount.service';
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from '@/lib/client/alert';
import { INITIAL_RESET_PASSWORD_REQUEST_AFTER } from '@/initials/UserAccount.initial';
import { initIsValids, allTrue, PASSWORD_REG_EXP } from '@/lib/client/isValidForm';
import { AuthMessage } from '@/messages/UserAccount.message';
import Spin from '@/components/partial/data/Spin';


type ResetPasswordURLProps = {
  uidb64: string;
  token: string;
}

const INPUT_NUM = 2;

const ResetPasswordAfter = (props: ResetPasswordURLProps) => {
  const router = useRouter();
  const [reqData, setReqData] = useState<ResetPasswordRequestAfterType>(INITIAL_RESET_PASSWORD_REQUEST_AFTER);
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
      await (new AuthService()).resetPassword(reqData, props.uidb64, props.token);
      await toastSuccess(AuthMessage.RESET_PASSWORD_SUCCESS);
      router.push('/auth/login');
    } catch {
      await toastError(AuthMessage.RESET_PASSWORD_ERROR);
      setIsSubmitted(false);
    }
  };

  const newPasswordValidate = () => {
    if (!PASSWORD_REG_EXP.test(reqData.new_password ?? '')) {
      return AuthMessage.PASSWORD_INPUT_ERROR;
    }
    return null;
  };

  const confirmNewPasswordValidate = () => {
    if (reqData.confirm_new_password !== reqData.new_password) {
      return AuthMessage.CONFIRM_PASSWORD_INPUT_NOT_MATCH;
    }
    return null;
  };


  return (
    <Form label='Đặt lại mật khẩu' className='w-[300px]' onSubmit={handleSubmit} useModal>
      <div>
        <Input 
          id='new-password'
          name='new_password'
          type='password'
          placeholder='Mật khẩu mới'
          required
          value={reqData.new_password}
          onChange={(e) => handleInputChange(e, setReqData)}
          validator={{
            validate: newPasswordValidate,
            setIsValids: setIsValids,
            isValidIndex: 0
          }}
          
        />
      </div>

      <div>
        <Input 
          id='confirm-new-password'
          name='confirm_new_password'
          type='password'
          placeholder='Nhập lại mật khẩu mới'
          required
          value={reqData.confirm_new_password}
          onChange={(e) => handleInputChange(e, setReqData)}
          validator={{
            validate: confirmNewPasswordValidate,
            setIsValids: setIsValids,
            isValidIndex: 1
          }}
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

export default ResetPasswordAfter;
