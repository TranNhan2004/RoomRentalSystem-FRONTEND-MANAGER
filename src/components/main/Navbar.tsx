'use client';

import Image from 'next/image'; 
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logoPicture from '../../../public/logo.png';
import { UserType } from '@/types/UserAccount';
import NavLink from '../partial/navbar/NavLink';
import DropdownMenu from '../partial/navbar/DropdownMenu';
import AccountInfo from '../partial/account/AccountInfo';
import { getUserEmail, getUserFirstName, getUserLastName } from '@/lib/client/authToken';


const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserType>({});

  useEffect(() => {
    const setUserInfoFromCookie = async () => {
      const [email, first_name, last_name] = await Promise.all([
        getUserEmail(),
        getUserFirstName(),
        getUserLastName()
      ]);

      setUserInfo({
        email: email,
        first_name: first_name,
        last_name: last_name
      });
    };

    setUserInfoFromCookie();
  }, []);

  return (
    <div>
      <div className='fixed top-0 left-0 h-full w-[16%] bg-mygreen p-2 overflow-y-auto'>
        <div className='mt-2 mb-8'>
          <Link href={'/'}>
            <Image 
              src={logoPicture} 
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
          <li><NavLink href='/data/users'>QL người dùng</NavLink></li>
          <li><NavLink href='/data/rental-rooms'>QL phòng trọ</NavLink></li>
          <li>
            <DropdownMenu
              label='QL địa chỉ'  
              links={[
                { label: 'Cấp tỉnh', href: '/data/addresses/provinces' },
                { label: 'Cấp huyện', href: '/data/addresses/districts' },
                { label: 'Cấp xã', href: '/data/addresses/communes' }
              ]}
            />
          </li>
          <li><NavLink href='/contact'>Liên hệ</NavLink></li>
        </ul>
      </div>
      
      <AccountInfo {...userInfo} />
    </div>
  );
};

export default Navbar;
