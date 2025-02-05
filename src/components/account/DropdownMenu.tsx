'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import BaseUserType from '@/interfaces/user-account/BaseUser.interface';
import { ArrowRightStartOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface DropdownMenuProps {
  children: React.ReactNode;
  data: BaseUserType;
}

const DropdownMenu = (props: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fullName = props.data.firstName + ' ' + props.data.lastName;
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
    <div className='relative' ref={dropdownRef}>
      <button 
        className='flex items-center w-full text-left' 
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.children}
      </button>
      
      {
        isOpen && (
          <ul 
            className='fixed top-16 right-2 bg-white shadow-md rounded-lg w-[15%] border border-gray-200' 
          >
            <li className='p-2 ml-[3%] mr-[3%] mt-[2%]'>
              <p className='text-sm text-gray-500'>{truncate(fullName)}</p>
              <p className='text-sm text-gray-500'>{truncate(email)}</p>
            </li>

            <div className='border-2 border-t border-gray-100 ml-[6%] mr-[6%] mt-[2%] mb-[2%]'></div>

            <li 
              className='p-2 hover:bg-green-100 rounded-lg ml-[3%] mr-[3%]' 
              onClick={() => setIsOpen(false)}
            >
              <Link href={'/profile'}>
                <div className='flex items-center p-[2%]'>
                  <PencilSquareIcon className='w-5 h-5 mr-2'/>
                  Chỉnh sửa
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
