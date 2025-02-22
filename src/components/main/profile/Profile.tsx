'use client';

import DefaultAvatar from '@/components/partial/account/DefaultAvatar';
import PotraitAvatar from '@/components/partial/account/PotraitAvatar';
import { DeleteButton, EditButton, UploadButton } from '@/components/partial/button/ActionButton';
import { getUserInfo } from '@/lib/client/authToken';
import { displayGender, displayRole } from '@/lib/client/display';
import formatDate from '@/lib/client/formatDate';
import { UserType } from '@/types/UserAccount.type';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type TextProps = {
  title: string;
  content: string | undefined;
}

const Text = (props: TextProps) => {
  return (
    <p className='text-gray-800'>
      <span className='text-gray-600'>{props.title}:&nbsp;&nbsp;</span>{props.content}
    </p>
  );
};

const Profile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserType>({});

  useEffect(() => {
    const setUserInfoFromCookie = async () => {
      setUserInfo(await getUserInfo());
    };

    setUserInfoFromCookie();
  }, []);

  return (
    <div className='p-6 w-full ml-[5%]'>
      <div className='grid grid-cols-3'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='relative'>
            {
              userInfo.avatar ?
              <PotraitAvatar data={userInfo} width={250} height={230} shape='square' /> :
              <DefaultAvatar data={userInfo} width={250} height={230} fontSize={100} shape='square' />
            } 
          </div>
          <div className='flex items-center space-x-4'>
            <UploadButton onClick={() => console.log('Upload Photo')}>Tải ảnh lên</UploadButton>
            <DeleteButton 
              onClick={() => console.log('Delete Photo')}
              disabled={!userInfo.avatar}
            >
              Gỡ ảnh
            </DeleteButton>
          </div>
          <div className='text-lef italic space-y-2'>
            <Text title='Ngày tạo tài khoản' content={formatDate(userInfo.created_at, 'dmy')} />
            <Text title='Lần cập nhật gần nhất' content={formatDate(userInfo.updated_at, 'dmy')} />
            <Text title='Lần đăng nhập gần nhất' content={formatDate(userInfo.last_login, 'dmy')} />
          </div>
        </div>

        <div className='border-l-4 border-gray-200 rounded-sm ml-[15%] h-[105%]'></div>
        
        <div className='flex flex-col justify-center space-y-4 ml-[-65%] mt-[-15%]'>
          <h2 className='text-3xl font-semibold text-gray-800'>{userInfo.first_name + ' ' + userInfo.last_name}</h2>
          <Text title='Email' content={userInfo.email} />
          <Text title='Số điện thoại' content={userInfo.phone_number} />
          <Text title='Số CCCD' content={userInfo.citizen_number} />
          <Text title='Giới tính' content={displayGender(userInfo.gender)} />
          <Text title='Ngày sinh' content={formatDate(userInfo.date_of_birth, 'dmy')} />
          <Text title='Vai trò' content={displayRole(userInfo.role)} />
          
          <div className='flex space-x-4'>
            <EditButton onClick={() => router.push('/profile/edit-info')}>Chỉnh sửa thông tin</EditButton>
            <EditButton onClick={() => router.push('/profile/change-password')}>Đổi mật khẩu</EditButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
