'use client';

import { UserType } from '@/types/UserAccount';
import Image from 'next/image';
import React from 'react';

type PotraitAvatarProps = {
  width: number;
  height: number;
  shape: 'square' | 'circle';
  data: UserType;
}

const PotraitAvatar = (props: PotraitAvatarProps) => {
  return (
    <div>
      <Image 
        src={props.data.avatar || '/avatar.svg'}
        alt="Avatar"
        width={props.width}
        height={props.height}
        className={props.shape == 'square' ? 'rounded-sm' : 'rounded-full'}
      />
    </div>
  );
};

export default PotraitAvatar;