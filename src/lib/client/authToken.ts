import { LoginResponseType } from "@/types/UserAccount";
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
export const USER_ID_CKNAME = 'session_user_id';
export const USER_EMAIL_CKNAME = 'session_user_email';
export const USER_FIRST_NAME_CKNAME = 'session_user_first_name';
export const USER_LAST_NAME_CKNAME = 'session_user_last_name';

export const REFRESH_COOKIE_EXPIRES = 7;
export const ACCESS_COOKIE_EXPIRES = 1 / 24;
export const USER_ID_EXPIRES = 7;
export const USER_EMAIL_EXPIRES = 7;
export const USER_FIRST_NAME_EXPIRES = 7;
export const USER_LAST_NAME_EXPIRES = 7;


export const handleLogin = async (data: LoginResponseType) => {  
  await setSecureCookie(REFRESH_TOKEN_CKNAME, data.refresh || '', REFRESH_COOKIE_EXPIRES);
  await setSecureCookie(ACCESS_TOKEN_CKNAME, data.access || '', ACCESS_COOKIE_EXPIRES);
  await setSecureCookie(USER_ID_CKNAME, data.id || '', USER_ID_EXPIRES);
  await setSecureCookie(USER_EMAIL_CKNAME, data.email || '', USER_EMAIL_EXPIRES);
  await setSecureCookie(USER_FIRST_NAME_CKNAME, data.first_name || '', USER_FIRST_NAME_EXPIRES);
  await setSecureCookie(USER_LAST_NAME_CKNAME, data.last_name || '', USER_LAST_NAME_EXPIRES);
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

export const getUserId = async () => {
  return await getSecureCookie(USER_ID_CKNAME);
};

export const getUserEmail = async () => {
  return await getSecureCookie(USER_EMAIL_CKNAME);
};

export const getUserFirstName = async () => {
  return await getSecureCookie(USER_FIRST_NAME_CKNAME);
};

export const getUserLastName = async () => {
  return await getSecureCookie(USER_LAST_NAME_CKNAME);
};

export const resetAuthTokens = async () => {
  await removeSecureCookie(REFRESH_TOKEN_CKNAME);
  await removeSecureCookie(ACCESS_TOKEN_CKNAME);
  await removeSecureCookie(USER_ID_CKNAME);
  await removeSecureCookie(USER_EMAIL_CKNAME);
  await removeSecureCookie(USER_FIRST_NAME_CKNAME);
  await removeSecureCookie(USER_LAST_NAME_CKNAME);
};