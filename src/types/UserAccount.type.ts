export type LoginRequestType = {
  email?: UserType['email'];
  password?: UserType['password'];
  role?: UserType['role'];
}

export type LoginResponseType = {
  refresh?: string;
  access?: string;
  user?: UserType;
}

export type ResetPasswordRequestBeforeType = {
  email?: UserType['email'];
}

export type ResetPasswordRequestAfterType = {
  new_password?: UserType['password'];
  confirm_new_password?: UserType['password'];
}

export type ChangePasswordType = {
  old_password?: UserType['password'];
  new_password?: UserType['password'];
  confirm_new_password?: UserType['password'];
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
  id_not?: UserType['id'];
  role_include?: UserType['role'][];
  is_active?: UserType['is_active'];
}