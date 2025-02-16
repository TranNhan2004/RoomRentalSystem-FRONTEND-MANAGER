export interface LoginRequestType {
  email?: string;
  password?: string;
}

export interface LoginResponseType {
  refresh?: string;
  access?: string;
  id?: string;
}