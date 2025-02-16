'use client';

import { resetAuthTokens } from '@/lib/auth-token/client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Logout = () => {
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

export default Logout;
