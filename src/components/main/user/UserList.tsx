'use client';

import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';


const UserList = () => {
  const [randomText, setRandomText] = useState('');

  useEffect(() => {
    setRandomText(faker.lorem.paragraph(100));
  }, []);

  return (
    <div>
      <h1>Users Page</h1>
      <p>This is the Users Page.</p>
      <div className='text-justify'>{randomText}</div>
    </div>
  );
};

export default UserList;