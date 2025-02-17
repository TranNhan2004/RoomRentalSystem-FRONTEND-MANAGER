'use server';

import { cookies } from "next/headers";
import { REFRESH_TOKEN_NAME } from "../client/authToken";
import { redirect } from "next/navigation";

export const checkLoginStatusForAuthPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME);
  console.log(refreshToken);

  if (!refreshToken) {
    redirect('/auth/login');
  }
};

export const checkLoginStatusForLoginPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME);
  console.log(refreshToken);

  if (refreshToken) {
    redirect('/');
  }
};