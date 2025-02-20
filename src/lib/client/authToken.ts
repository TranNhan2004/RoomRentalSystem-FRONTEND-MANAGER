import { LoginResponseType, UserType } from "@/types/UserAccount";
import { encryptValue, decryptValue } from "../server/aesCrypto";
import { setCookie, getCookie, removeCookie } from "typescript-cookie";


const setSecureCookie = async (name: string, value: string, expires: number) => {
  const encryptedValue = await encryptValue(value);
  setCookie(name, encryptedValue, { secure: true, sameSite: 'none', path: '/', expires: expires });
};

const getSecureCookie = async (name: string) => {
  const encryptedValue = getCookie(name);
  if (encryptedValue) {
    return await decryptValue(encryptedValue);
  }
  return undefined;
};

const removeSecureCookie = async (name: string) => {
  removeCookie(name, { secure: true, sameSite: 'none', path: '/' });
};


export const REFRESH_TOKEN_CKNAME = 'session_refresh_token';
export const ACCESS_TOKEN_CKNAME = 'session_access_token';
export const USER_INFO_CKNAME = 'session_user_info';

export const REFRESH_COOKIE_EXPIRES = 7;
export const ACCESS_COOKIE_EXPIRES = 1 / 24;
export const USER_INFO_EXPIRES = 7;

export const handleLogin = async (data: LoginResponseType) => {  
  await setSecureCookie(REFRESH_TOKEN_CKNAME, data.refresh || '', REFRESH_COOKIE_EXPIRES);
  await setSecureCookie(ACCESS_TOKEN_CKNAME, data.access || '', ACCESS_COOKIE_EXPIRES);
  await setSecureCookie(USER_INFO_CKNAME, JSON.stringify(data.user) || '', USER_INFO_EXPIRES);
};

export const getRefreshedAccessToken = async () => {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    await resetAuthTokens();
  } else {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();

    if (data.access) {
      await setSecureCookie(ACCESS_TOKEN_CKNAME, data.access, ACCESS_COOKIE_EXPIRES);
      return data.access;
    } else {
      await resetAuthTokens();
    }
  }
};

export const getRefreshToken = async () => {
  return await getSecureCookie(REFRESH_TOKEN_CKNAME);
};

export const getAccessToken = async () => {
  return await getSecureCookie(ACCESS_TOKEN_CKNAME);
};

export const getUserInfo = async () => {
  return JSON.parse(await getSecureCookie(USER_INFO_CKNAME) ?? '') as UserType;
};

export const resetAuthTokens = async () => {
  await removeSecureCookie(REFRESH_TOKEN_CKNAME);
  await removeSecureCookie(ACCESS_TOKEN_CKNAME);
  await removeSecureCookie(USER_INFO_CKNAME);
};