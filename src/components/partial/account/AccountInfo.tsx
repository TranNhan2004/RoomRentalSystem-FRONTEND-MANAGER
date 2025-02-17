'use client';

import React from 'react';
import DropdownMenu from './DropdownMenu';
import PotraitAvatar from './PotraitAvatar';
import StandardAvatar from './StandardAvatar';
import { UserType } from '@/interfaces/UserAccount.interface';


const AccountInfo = (props: UserType) => {
  return (
    <>
      <DropdownMenu data={props}>
        <div className="fixed top-2 right-2 p-1 bg-white text-black rounded-full shadow-lg cursor-pointer border-2 border-green-50">
          {
            props.avatar ? 
            <PotraitAvatar avatar={props.avatar}/> :
            <StandardAvatar firstName={props.firstName} /> 
          }
        </div>
      </DropdownMenu>
    </>
  );
};

export default AccountInfo;