'use client';

import React, { useEffect, useState } from 'react';
import { UserType } from '@/types/UserAccount.type';

const backgroundColors = [
  '27445D', '497D74', '71BBB2', '3674B5', '578FCA', 
  '73C7C7', '493D9E', 'B2A5FF', 'B82132', 'D2665A',
  'F2B28C', 'EFB036'
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