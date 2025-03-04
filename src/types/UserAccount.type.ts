export type LoginRequestType = Pick<UserType, 'email' | 'password' | 'role'>;

export type LoginResponseType = {
  refresh?: string;
  access?: string;
  user?: UserType;
}

export type ResetPasswordRequestBeforeType = Pick<UserType, 'email'>;

export type ResetPasswordRequestAfterType = {
  new_password?: string;
  confirm_new_password?: string;
}

export type ChangePasswordType = {
  old_password?: string;
  new_password?: string;
  confirm_new_password?: string;
}

export type UserType = {
  id?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  citizen_number?: string;
  date_of_birth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'UNKNOWN' | '';
  role?: 'MANAGER' | 'LESSOR' | 'RENTER' | '';
  workplace_commune?: string;
  workplace_additional_address?: string;
  is_active?: boolean;
  last_login?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export type UserQueryType = {
  role_include?: string[];
  is_active?: boolean;
}