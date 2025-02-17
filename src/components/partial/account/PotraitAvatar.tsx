'use client';

import { UserType } from '@/interfaces/UserAccount.interface';
import Image from 'next/image';
import React from 'react';

const PotraitAvatar = (props: UserType) => {
  return (
    <div>
      <Image 
        src={props.avatar || '/avatar.svg'}
        alt="Avatar"
        width={30}
        height={30}
        className='rounded-full'
      />
    </div>
  );
};

export default PotraitAvatar;