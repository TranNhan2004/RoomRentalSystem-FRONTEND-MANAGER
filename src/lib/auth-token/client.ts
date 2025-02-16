import { LoginResponseType } from "@/interfaces/user-account/Login.interface";
import { encryptValue, decryptValue } from "../secure";
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
  return null;
};

const removeSecureCookie = async (name: string) => {
  removeCookie(name, { secure: true, sameSite: 'none', path: '/' });
};


export const REFRESH_TOKEN_NAME = 'session_refresh_token';
export const ACCESS_TOKEN_NAME = 'session_access_token';
export const USER_ID_NAME = 'session_user_id';

const REFRESH_COOKIE_EXPIRES = 7;
const ACCESS_COOKIE_EXPIRES = 1 / 24;
const USER_ID_EXPIRES = 7;

export const handleLogin = async (data: LoginResponseType) => {  
  await setSecureCookie(REFRESH_TOKEN_NAME, data.refresh || '', REFRESH_COOKIE_EXPIRES);
  await setSecureCookie(ACCESS_TOKEN_NAME, data.access || '', ACCESS_COOKIE_EXPIRES);
  await setSecureCookie(USER_ID_NAME, data.id || '', USER_ID_EXPIRES);
};

export const getRefreshedAccessToken = async () => {
  const refreshToken = await getRefreshToken();

  console.log('RT:', refreshToken);

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
      await setSecureCookie(ACCESS_TOKEN_NAME, data.access, ACCESS_COOKIE_EXPIRES);
      return data.access;
    } else {
      await resetAuthTokens();
    }
  }
};

export const getRefreshToken = async () => {
  return await getSecureCookie(REFRESH_TOKEN_NAME);
};

export const getAccessToken = async () => {
  return await getSecureCookie(ACCESS_TOKEN_NAME);
};

export const getUserId = async () => {
  return await getSecureCookie(USER_ID_NAME);
};

export const resetAuthTokens = async () => {
  await removeSecureCookie(REFRESH_TOKEN_NAME);
  await removeSecureCookie(ACCESS_TOKEN_NAME);
  await removeSecureCookie(USER_ID_NAME);
};