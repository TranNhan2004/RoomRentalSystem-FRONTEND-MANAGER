export type LoginRequestType = {
  email?: string;
  password?: string;
}

export type LoginResponseType = {
  refresh?: string;
  access?: string;
  user?: UserType;
}

export type ResetPasswordRequestBeforeType = {
  email?: string;
}

export type ResetPasswordRequestAfterType = {
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
  gender?: 'M' | 'F' | 'U';
  avatar?: string | null;
  role?: 'M' | 'L' | 'R';
  workplace_commune?: string;
  workplace_additional_address?: string;
  is_active?: boolean;
  last_login?: Date;
  created_at?: Date;
  updated_at?: Date;
}