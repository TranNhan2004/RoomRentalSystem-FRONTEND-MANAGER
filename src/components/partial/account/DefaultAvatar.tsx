'use client';

import React, { useEffect, useState } from 'react';
import { UserType } from '@/types/UserAccount.type';

const backgroundColors = [
  '27445D', // Xanh navy đậm
  '497D74', // Xanh lam ngả lục
  '71BBB2', // Xanh ngọc nhạt
  'B2A5FF', // Tím pastel
  'F2B28C', // Cam nhạt
  'EFB036'  // Vàng đậm
];

type DefaultAvatarProps = {
  width: number;
  height: number;
  fontSize: number;
  shape: 'square' | 'circle';
  data: UserType;
}

export const DefaultAvatar = (props: DefaultAvatarProps) => {
  const [avatarColor, setAvatarColor] = useState('');

  useEffect(() => {
    let storedColor = localStorage.getItem('avatar_color');
    if (!storedColor) {
      const index = Math.floor(Math.random() * backgroundColors.length);
      storedColor = `#${backgroundColors[index]}`;
      localStorage.setItem('avatar_color', storedColor);
    }
    setAvatarColor(storedColor);
  }, []);

  return (
    <div
      className={`${props.shape === 'square' ? 'rounded-lg' : 'rounded-full'} flex justify-center 
                    items-center text-white`}
      style={{
        backgroundColor: avatarColor,
        width: `${props.width}px`,
        height: `${props.height}px`,
        fontFamily: 'Arial',
        fontSize: `${props.fontSize}px`
      }}
      title={props.data.first_name}
    >
      {props.data.first_name?.at(0)?.toUpperCase() || '?'}
    </div>
  );
};