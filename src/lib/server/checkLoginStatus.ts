'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { REFRESH_TOKEN_CKNAME, USER_INFO_CKNAME } from "../client/authToken";

export const checkLoginStatusForAuthPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_CKNAME);
  const userInfo = cookieStore.get(USER_INFO_CKNAME);

  if (!refreshToken || !userInfo) {
    redirect('/auth/login');
  }
};

export const checkLoginStatusForNotAuthPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_CKNAME);
  const userInfo = cookieStore.get(USER_INFO_CKNAME);

  if (refreshToken && userInfo) {
    redirect('/');
  }
};