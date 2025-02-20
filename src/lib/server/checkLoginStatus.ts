'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { REFRESH_TOKEN_CKNAME } from "../client/authToken";

export const checkLoginStatusForAuthPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_CKNAME);

  if (!refreshToken) {
    redirect('/auth/login');
  }
};

export const checkLoginStatusForLoginPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_CKNAME);

  if (refreshToken) {
    redirect('/');
  }
};