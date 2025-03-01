import { LoginResponseType, UserType } from "@/types/UserAccount.type";
import { encryptValue, decryptValue } from "../server/aesCrypto";
import { setCookie, getCookie, removeCookie } from "typescript-cookie";
import { 
  getAccessTokenCookieName, 
  getAccessTokenExpires, 
  getRefreshTokenCookieName, 
  getRefreshTokenExpires, 
  getMyInfoCookieName, 
  getMyInfoExpires 
} from "../server/getCookiesName";

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


export const handleLogin = async (data: LoginResponseType) => {  
  const [rtkCkName, rtkExpires, atkCkName, atkExpires, myInfoCkName, myInfoExpires] = await Promise.all([
    getRefreshTokenCookieName(),
    getRefreshTokenExpires(),
    getAccessTokenCookieName(),
    getAccessTokenExpires(),
    getMyInfoCookieName(),
    getMyInfoExpires(),
  ]);

  await Promise.all([
    setSecureCookie(rtkCkName, data.refresh || '', rtkExpires),
    setSecureCookie(atkCkName, data.access || '', atkExpires),
    setSecureCookie(myInfoCkName, JSON.stringify(data.user) || '', myInfoExpires)
  ]);
};

export const getRefreshedAccessToken = async () => {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    await resetAuthTokens();
  } else {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/app.user-account/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
  
    if (data.access) {
      await setSecureCookie(await getAccessTokenCookieName(), data.access, await getAccessTokenExpires());
      return data.access;
    } else {
      await resetAuthTokens();
    }
  }
};

export const getRefreshToken = async () => {
  return await getSecureCookie(await getRefreshTokenCookieName());
};

export const getAccessToken = async () => {
  return await getSecureCookie(await getAccessTokenCookieName());
};

export const getMyInfo = async () => {
  return JSON.parse(await getSecureCookie(await getMyInfoCookieName()) ?? '') as UserType;
};

export const setMyInfo = async (data: UserType) => {
  await removeSecureCookie(await getMyInfoCookieName());
  await setSecureCookie(
    await getMyInfoCookieName(), 
    JSON.stringify(data), 
    await getMyInfoExpires()
  );
};

export const resetAuthTokens = async () => {
  const [rtkCkName, atkCkName, myInfoCkName] = await Promise.all([
    getRefreshTokenCookieName(),
    getAccessTokenCookieName(),
    getMyInfoCookieName(),
  ]);

  await Promise.all([
    removeSecureCookie(rtkCkName),
    removeSecureCookie(atkCkName),
    removeSecureCookie(myInfoCkName)
  ]);
};