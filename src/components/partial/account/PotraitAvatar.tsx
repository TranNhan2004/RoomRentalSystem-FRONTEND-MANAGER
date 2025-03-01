'use client';

import React from 'react';
import Image from 'next/image';
import { UserType } from '@/types/UserAccount.type';

type PotraitAvatarProps = {
  width: number;
  height: number;
  shape: 'square' | 'circle';
  data: UserType;
}

export const PotraitAvatar = (props: PotraitAvatarProps) => {
  return (
    <div>
      <Image 
        src={props.data.avatar || 'avatar.svg'}
        alt="Avatar"
        width={props.width}
        height={props.height}
        className={props.shape == 'square' ? 'rounded-lg' : 'rounded-full'}
      />
    </div>
  );
};