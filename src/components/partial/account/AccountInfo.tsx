'use client';

import React from 'react';
import { UserType } from '@/types/UserAccount.type';
import { DropdownMenu } from './DropdownMenu';
import { DefaultAvatar } from './DefaultAvatar';


export const AccountInfo = (props: UserType) => {
  return (
    <>
      <DropdownMenu data={props}>
        <div className="fixed top-2 right-2 p-1 bg-white text-black rounded-full shadow-lg cursor-pointer 
                          border-2 border-green-50">
      
          <DefaultAvatar data={props} width={40} height={40} fontSize={18} shape='circle' /> 
        </div>
      </DropdownMenu>
    </>
  );
};