export const initIsValids = (num: number): boolean[] => Array(num).fill(false);

export const allTrue = (isValids: boolean[]): boolean => isValids.every((isValid) => isValid);

export const EMAIL_REG_EXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;