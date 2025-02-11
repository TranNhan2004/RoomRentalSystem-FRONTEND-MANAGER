'use client';

import BaseUserType from '@/interfaces/user-account/User.interface';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';

const backgroundColors = [
  '27445D', '497D74', '71BBB2', '3674B5', '578FCA', 
  '73C7C7', '493D9E', 'B2A5FF', 'B82132', 'D2665A',
  'F2B28C', 'EFB036'
];

const StandardAvatar = (props: BaseUserType) => {
  const [avatarColor, setAvatarColor] = useState('');

  useEffect(() => {
    let storedColor = localStorage.getItem('avatarColor');
    if (!storedColor) {
      const index = Math.floor(Math.random() * backgroundColors.length);
      storedColor = `#${backgroundColors[index]}`;
      localStorage.setItem('avatarColor', storedColor);
    }
    setAvatarColor(storedColor);
  }, []);

  return (
    <div>
      <Avatar 
        name={props.firstName?.at(0)?.toUpperCase() || '?'}
        size='40'
        round={true}
        color={avatarColor}
        title={props.firstName}
        alt={props.firstName}
      />
    </div>
  );
};

export default StandardAvatar;
