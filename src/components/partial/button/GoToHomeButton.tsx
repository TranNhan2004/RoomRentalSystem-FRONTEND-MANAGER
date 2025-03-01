'use client';

import React from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export const GoToHomeButton = () => {
  const router = useRouter();
  
  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <>
      <button
        onClick={handleGoToHome}
        className="mt-8 px-6 py-2 text-white bg-mygreen rounded-lg flex items-center space-x-2 
                    justify-center hover:bg-mydarkgreen transition duration-300 ease-in-out"
      >
        <HomeIcon className="w-5 h-5 mr-2" />
        Về trang chủ
      </button>
    </>
  );
};