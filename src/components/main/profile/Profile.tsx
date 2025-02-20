'use client';

import DefaultAvatar from '@/components/partial/account/DefaultAvatar';
import PotraitAvatar from '@/components/partial/account/PotraitAvatar';
import { DeleteButton, EditButton, UploadButton } from '@/components/partial/button/FeatureButton';
import { UserType } from '@/types/UserAccount';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type TextProps = {
  title: string;
  content: string;
}

const Text = (props: TextProps) => {
  return (
    <>
      <p className='text-gray-500'>
        <span className='text-gray-600'>{props.title}:&nbsp;&nbsp;</span>{props.content}
      </p>
    </>
  );
};

const Profile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserType>({});

  useEffect(() => {
  }, []);

  return (
    <div className='p-6 w-full'>
      <div className='grid grid-cols-3'>
        <div className='flex flex-col items-center space-y-4 ml-[-15%]'>
          <div className='relative'>
            {
              userInfo.avatar ?
              <PotraitAvatar data={userInfo} width={270} height={250} shape='square' /> :
              <DefaultAvatar data={userInfo} width={270} height={250} fontSize={100} shape='square' />
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
            <Text title='Ngày tạo tài khoản' content='0123 456 789' />
            <Text title='Lần cập nhật gần nhất' content='0123 456 789' />
            <Text title='Lần đăng nhập gần nhất' content='0123 456 789' />
          </div>
        </div>

        <div className='border-l-4 border-gray-200 rounded-sm ml-[10%] h-[105%]'></div>
        
        <div className='flex flex-col justify-center space-y-4 ml-[-65%] mt-[-15%]'>
          <h2 className='text-3xl font-semibold text-gray-800'>Nguyễn Văn A</h2>
          <Text title='Email' content='nguyenvana@example.com' />
          <Text title='Số điện thoại' content='0123 456 789' />
          <Text title='Số CCCD' content='0123 456 789' />
          <Text title='Giới tính' content='0123 456 789' />
          <Text title='Ngày sinh' content='0123 456 789' />
          <Text title='Vai trò' content='0123 456 789' />
          <Text title='Trạng thái tài khoản' content='0123 456 789' />

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
