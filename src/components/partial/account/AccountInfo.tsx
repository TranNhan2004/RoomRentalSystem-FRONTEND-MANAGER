'use client';

import React from 'react';
import DropdownMenu from './DropdownMenu';
import PotraitAvatar from './PotraitAvatar';
import StandardAvatar from './DefaultAvatar';
import { UserType } from '@/types/UserAccount.type';


const AccountInfo = (props: UserType) => {
  return (
    <>
      <DropdownMenu data={props}>
        <div className="fixed top-2 right-2 p-1 bg-white text-black rounded-full shadow-lg cursor-pointer 
                          border-2 border-green-50">
          {
            props.avatar ? 
            <PotraitAvatar data={props} width={40} height={40} shape='circle' /> :
            <StandardAvatar data={props} width={40} height={40} fontSize={18} shape='circle' /> 
          }
        </div>
      </DropdownMenu>
    </>
  );
};

export default AccountInfo;