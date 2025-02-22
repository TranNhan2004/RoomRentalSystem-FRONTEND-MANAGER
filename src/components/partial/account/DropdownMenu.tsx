'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightStartOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { UserType } from '@/types/UserAccount.type';

interface DropdownMenuProps {
  children: React.ReactNode;
  data: UserType;
}

const DropdownMenu = (props: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fullName = props.data.first_name + ' ' + props.data.last_name;
  const email = props.data.email ?? '';

  const truncate = (str: string) => str.length > 18 ? str.slice(0, 18) + '...' : str;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative text-[14px]' ref={dropdownRef}>
      <button 
        className='flex items-center w-full text-left' 
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.children}
      </button>
      
      {
        isOpen && (
          <ul 
            className='fixed top-16 right-2 bg-gray-50 shadow-md rounded-lg w-[15%] border border-gray-200' 
          >
            <li className='p-2 ml-[3%] mr-[3%] mt-[2%]'>
              <p className='text-sm text-gray-500'>{truncate(fullName)}</p>
              <p className='text-sm text-gray-500'>{truncate(email)}</p>
            </li>

            <div className='border-2 border-t border-gray-150 ml-[6%] mr-[6%] mt-[2%] mb-[2%] rounded-lg'></div>

            <li 
              className='p-2 hover:bg-green-100 rounded-lg ml-[3%] mr-[3%]' 
              onClick={() => setIsOpen(false)}
            >
              <Link href={'/profile'}>
                <div className='flex items-center p-[2%]'>
                  <PencilSquareIcon className='w-5 h-5 mr-2'/>
                  Hồ sơ của tôi
                </div>
              </Link>
            </li>

            <li 
              className='p-2 hover:bg-green-100 rounded-lg ml-[3%] mr-[3%] mb-[3%]' 
              onClick={() => setIsOpen(false)}
            >
              <Link href={'/auth/logout'}>
                <div className='flex items-center p-[2%]'>
                  <ArrowRightStartOnRectangleIcon className='w-5 h-5 mr-2'/>
                  Đăng xuất
                </div>
              </Link>
            </li>
          </ul>
        )
      }
    </div>
  );
};

export default DropdownMenu;
