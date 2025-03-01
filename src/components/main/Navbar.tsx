'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { UserType } from '@/types/UserAccount.type';
import { getMyInfo } from '@/lib/client/authToken';
import { getImageSrc } from '@/lib/client/getImageSrc';
import { AccountInfo } from '../partial/account/AccountInfo';
import { NavLink } from '../partial/navbar/NavLink';
import { DropdownMenu } from '../partial/navbar/DropdownMenu';


export const Navbar = () => {
  const [myInfo, setMyInfo] = useState<UserType>({});

  useEffect(() => {
    const setMyInfoFromCookie = async () => {
      setMyInfo(await getMyInfo());
    };

    setMyInfoFromCookie();
  }, []);

  return (
    <div>
      <div className='fixed top-0 left-0 h-full w-[16%] bg-mygreen p-2 overflow-y-auto'>
        <div className='mt-2 mb-8'>
          <Link href={'/'}>
            <Image 
              src={getImageSrc('logo.png')} 
              alt='Logo' 
              width={200} 
              height={200} 
              className='w-[95%]' 
              priority={false}
            />
          </Link>
        </div>

        <ul className='space-y-4 ml-[3%]'>
          <li><NavLink href='/'>Trang chủ</NavLink></li>
          <li><NavLink href='/users'>QL người dùng</NavLink></li>
          <li><NavLink href='/rental-rooms'>QL phòng trọ</NavLink></li>
          <li>
            <DropdownMenu
              label='QL địa chỉ'  
              links={[
                { label: 'Tỉnh', href: '/addresses/provinces' },
                { label: 'Huyện', href: '/addresses/districts' },
                { label: 'Xã', href: '/addresses/communes' }
              ]}
            />
          </li>
          <li><NavLink href='/contact'>Liên hệ</NavLink></li>
        </ul>
      </div>
      
      <AccountInfo {...myInfo} />
    </div>
  );
};