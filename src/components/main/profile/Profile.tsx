'use client';

import React, { useEffect, useState } from 'react';
import { ActionButton } from '@/components/partial/button/ActionButton';
import { getMyInfo, setMyInfo } from '@/lib/client/authToken';
import { displayGender, displayRole } from '@/lib/client/display';
import { formatDate } from '@/lib/client/formatDate';
import { UserType } from '@/types/UserAccount.type';
import { useRouter } from 'next/navigation';
import { DataLine } from '@/components/partial/data/DataLine';
import { PotraitAvatar } from '@/components/partial/account/PotraitAvatar';
import { DefaultAvatar } from '@/components/partial/account/DefaultAvatar';


export const Profile = () => {
  const router = useRouter();
  const [myInfoData, setMyInfoData] = useState<UserType>({});

  useEffect(() => {
    const setMyInfoDataFromCookie = async () => {
      setMyInfoData(await getMyInfo());
    };

    setMyInfoDataFromCookie();
  }, []);

  const handleUploadAvatar = async () => {
    await setMyInfo(myInfoData);
    router.refresh();
  };

  const handleRemoveAvatar = async () => {
    router.refresh();
  };

  return (
    <div className='p-6 w-full ml-[5%]'>
      <div className='grid grid-cols-3'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='relative'>
            {
              myInfoData.avatar ?
              <PotraitAvatar data={myInfoData} width={250} height={230} shape='square' /> :
              <DefaultAvatar data={myInfoData} width={250} height={230} fontSize={100} shape='square' />
            } 
          </div>
          <div className='flex items-center space-x-4'>
            <ActionButton
              mode='upload' 
              onClick={handleUploadAvatar}
            >
              Tải ảnh lên
            </ActionButton>

            <ActionButton
              mode='delete'
              onClick={handleRemoveAvatar}
              disabled={!myInfoData.avatar}
            >
              Gỡ ảnh
            </ActionButton>

          </div>
          <div className='text-lef italic space-y-2'>
            <DataLine label='Ngày tạo tài khoản' value={formatDate(myInfoData.created_at, 'dmy')} />
            <DataLine label='Lần cập nhật gần nhất' value={formatDate(myInfoData.updated_at, 'dmy')} />
            <DataLine label='Lần đăng nhập gần nhất' value={formatDate(myInfoData.last_login, 'dmy')} />
          </div>
        </div>

        <div className='border-l-4 border-gray-200 rounded-sm ml-[15%] h-[105%]'></div>
        
        <div className='flex flex-col justify-center space-y-4 ml-[-65%] mt-[-15%]'>
          <h2 className='text-3xl font-semibold text-gray-800'>{myInfoData.first_name + ' ' + myInfoData.last_name}</h2>
          <DataLine label='Email' value={myInfoData.email} />
          <DataLine label='Số điện thoại' value={myInfoData.phone_number} />
          <DataLine label='Số CCCD' value={myInfoData.citizen_number} />
          <DataLine label='Giới tính' value={displayGender(myInfoData.gender)} />
          <DataLine label='Ngày sinh' value={formatDate(myInfoData.date_of_birth, 'dmy')} />
          <DataLine label='Vai trò' value={displayRole(myInfoData.role)} />
          
          <div className='flex space-x-4'>
            <ActionButton 
              mode='edit' 
              onClick={() => router.push('/profile/edit-info')}
            >
              Chỉnh sửa thông tin
            </ActionButton>
            
            <ActionButton 
              mode='edit'
              onClick={() => router.push('/profile/change-password')}
            >
              Đổi mật khẩu
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};