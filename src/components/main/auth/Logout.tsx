'use client';

import React, { useEffect } from 'react';
import { resetAuthTokens } from '@/lib/client/authToken';
import { useRouter } from 'next/navigation';

export const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(async () => {
      await resetAuthTokens();
      router.refresh();
    }, 3000);
  }, [router]);

  return (
    <div className='flex items-center justify-center text-lg space-x-2'>
      <h1>Đang đăng xuất</h1>
      <span className="dot animate-bounce1">.</span>
      <span className="dot animate-bounce2">.</span>
      <span className="dot animate-bounce3">.</span>
    </div>
  );
};