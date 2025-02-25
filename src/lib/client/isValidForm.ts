import { InputRefHandler } from "@/components/partial/form/Input";

export const isValidatedForm = (inputRefs: React.RefObject<{[key: string]: InputRefHandler | null;}>) => {
  for (const key in inputRefs.current) {
    console.log(key, inputRefs.current[key]);
    if (inputRefs.current[key] && !inputRefs.current[key].formValidate()) {
      return false;
    }
  }
  return true;
};

export const EMAIL_REG_EXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;