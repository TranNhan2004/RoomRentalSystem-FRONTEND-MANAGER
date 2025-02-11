'use client';

import BaseUserType from '@/interfaces/user-account/User.interface';
import Image from 'next/image';
import React from 'react';

const PotraitAvatar = (props: BaseUserType) => {
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