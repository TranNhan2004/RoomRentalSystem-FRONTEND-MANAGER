import { ChangePasswordType, LoginRequestType, ResetPasswordRequestAfterType, ResetPasswordRequestBeforeType } from "@/types/UserAccount.type";

export const INITIAL_LOGIN_REQUEST: LoginRequestType = {
  email: '',
  password: ''
} as const;

export const INITIAL_RESET_PASSWORD_REQUEST_BEFORE: ResetPasswordRequestBeforeType = {
  email: ''
} as const;

export const INITIAL_RESET_PASSWORD_REQUEST_AFTER: ResetPasswordRequestAfterType = {
  new_password: '',
  confirm_new_password: ''
} as const;

export const INITIAL_CHANGE_PASSWORD: ChangePasswordType = {
  id: '',
  old_password: '',
  new_password: '',
  confirm_new_password: ''
} as const;