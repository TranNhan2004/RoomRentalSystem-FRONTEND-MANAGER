import { LoginResponseType, UserType } from "@/types/UserAccount.type";
import { encryptValue, decryptValue } from "../server/aesCrypto";
import { setCookie, getCookie, removeCookie } from "typescript-cookie";
import { 
  getAccessTokenCookieName, 
  getAccessTokenExpires, 
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
  const [atkCkName, atkExpires, myInfoCkName, myInfoExpires] = await Promise.all([
    getAccessTokenCookieName(),
    getAccessTokenExpires(),
    getMyInfoCookieName(),
    getMyInfoExpires(),
  ]);

  await Promise.all([
    setSecureCookie(atkCkName, data.access || '', atkExpires),
    setSecureCookie(myInfoCkName, JSON.stringify(data.user) || '', myInfoExpires)
  ]);
};

export const getAccessToken = async () => {
  return await getSecureCookie(await getAccessTokenCookieName());
};

export const getMyInfo = async () => {
  return JSON.parse(await getSecureCookie(await getMyInfoCookieName()) ?? '{}') as UserType;
};

export const setAccessToken = async (accessToken: string) => {
  await removeSecureCookie(await getAccessTokenCookieName());
  await setSecureCookie(
    await getAccessTokenCookieName(), 
    accessToken, 
    await getAccessTokenExpires()
  );
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
  const [atkCkName, myInfoCkName] = await Promise.all([
    getAccessTokenCookieName(),
    getMyInfoCookieName(),
  ]);

  await Promise.all([
    removeSecureCookie(atkCkName),
    removeSecureCookie(myInfoCkName)
  ]);
};