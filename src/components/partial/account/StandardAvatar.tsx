'use client';

import { UserType } from '@/interfaces/UserAccount';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';

const backgroundColors = [
  '27445D', '497D74', '71BBB2', '3674B5', '578FCA', 
  '73C7C7', '493D9E', 'B2A5FF', 'B82132', 'D2665A',
  'F2B28C', 'EFB036'
];

const StandardAvatar = (props: UserType) => {
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
    <div>
      <Avatar 
        name={props.first_name?.at(0)?.toUpperCase() || '?'}
        size='40'
        round={true}
        color={avatarColor}
        title={props.first_name}
        alt={props.first_name}
      />
    </div>
  );
};

export default StandardAvatar;
