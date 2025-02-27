'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRefreshTokenCookieName, getUserInfoCookieName } from "./getCookiesName";

export const checkLoginStatusForAuthPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(await getRefreshTokenCookieName());
  const userInfo = cookieStore.get(await getUserInfoCookieName());

  if (!refreshToken || !userInfo) {
    redirect('/auth/login');
  }
};

export const checkLoginStatusForNotAuthPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(await getRefreshTokenCookieName());
  const userInfo = cookieStore.get(await getUserInfoCookieName());

  if (refreshToken && userInfo) {
    redirect('/');
  }
};