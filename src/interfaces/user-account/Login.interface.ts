export interface LoginRequestType {
  email?: string;
  password?: string;
}

export interface LoginResponseType {
  id?: string;
  access?: string;
}