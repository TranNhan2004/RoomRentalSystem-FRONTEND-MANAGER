import { toastError } from "./alert";

export const isValidForm = async (validators: {[key: string]: () => string | null}) => {
  for (const key in validators) {
    const validateResult = validators[key]();
    if (validateResult) {
      await toastError(validateResult);
      return false;
    }
  }
  return true;
};

export const EMAIL_REG_EXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;