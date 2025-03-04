import { ChangePasswordType, LoginRequestType, ResetPasswordRequestAfterType, ResetPasswordRequestBeforeType, UserQueryType, UserType } from "@/types/UserAccount.type";

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
  old_password: '',
  new_password: '',
  confirm_new_password: ''
} as const;

export const INITIAL_USER: UserType = {
  id: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  citizen_number: '',
  date_of_birth: new Date(),
  gender: 'UNKNOWN',
  role: 'MANAGER',
  account_balance: 0,
  workplace_commune: '',
  workplace_additional_address: '',
  is_active: false,
  last_login: new Date(),
  created_at: new Date(),
  updated_at: new Date()
};

export const INITIAL_USER_QUERY: UserQueryType = {
  id_not: '',
  role_include: [''],
  is_active: true
} as const;