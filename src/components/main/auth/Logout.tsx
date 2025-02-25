'use client';

import { resetAuthTokens } from '@/lib/client/authToken';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await resetAuthTokens();
      router.refresh();
    };

    handleLogout();
  }, [router]);

  return (
    <div>
      <h1>Đang đăng xuất...</h1>
    </div>
  );
};