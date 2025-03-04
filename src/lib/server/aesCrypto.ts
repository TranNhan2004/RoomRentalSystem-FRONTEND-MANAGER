'use server';

import { AES, enc } from "crypto-ts";

const SECRET_KEY = process.env.SECRET_KEY || 'room-rental-management-tran-hai-nhan-2004';

export const encryptValue = async (value: string) => {
  const ciphertext = AES.encrypt(value, SECRET_KEY).toString();
  return ciphertext;
};

export const decryptValue = async (cipherText: string) => {
  const bytes = AES.decrypt(cipherText, SECRET_KEY);
  const originalValue = bytes.toString(enc.Utf8);
  return originalValue;
};