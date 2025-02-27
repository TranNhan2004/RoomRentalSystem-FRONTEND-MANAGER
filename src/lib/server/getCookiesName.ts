'use server';

export const getRefreshTokenCookieName = async () => {
  return process.env.SESSION_MANAGER_REFRESH_TOKEN_CKNAME ?? '';
};

export const getAccessTokenCookieName = async () => {
  return process.env.SESSION_MANAGER_ACCESS_TOKEN_CKNAME ?? '';
};

export const getUserInfoCookieName = async () => {
  return process.env.SESSION_MANAGER_USER_INFO_CKNAME ?? '';
};

export const getRefreshTokenExpires = async () => {
  return (Number(process.env.SESSION_MANAGER_REFRESH_TOKEN_EXPIRES) ?? 0) / (24 * 3600); 
};

export const getAccessTokenExpires = async () => {
  return (Number(process.env.SESSION_MANAGER_ACCESS_TOKEN_EXPIRES) ?? 0) / (24 * 3600);
};

export const getUserInfoExpires = async () => {
  return (Number(process.env.SESSION_MANAGER_USER_INFO_EXPIRES) ?? 0) / (24 * 3600);
};