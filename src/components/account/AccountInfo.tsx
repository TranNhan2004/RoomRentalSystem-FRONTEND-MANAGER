'use client';

import React from 'react';
import DropdownMenu from './DropdownMenu';
import BaseUserType from '@/interfaces/user-account/BaseUser.interface';
import PotraitAvatar from './PotraitAvatar';
import StandardAvatar from './StandardAvatar';

const AccountInfo = (props: BaseUserType) => {
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