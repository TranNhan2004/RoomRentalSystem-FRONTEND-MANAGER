export type LoginRequestType = {
  email?: string;
  password?: string;
}

export type LoginResponseType = {
  refresh?: string;
  access?: string;
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export type UserType = {
  id?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  citizen_number?: string;
  phone_number?: string;
  date_of_birth?: Date;
  gender?: 'M' | 'F' | 'U';
  avatar?: string | null;
  role?: 'M' | 'L' | 'R';
  workplace_commune?: string;
  workplace_additional_address?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}