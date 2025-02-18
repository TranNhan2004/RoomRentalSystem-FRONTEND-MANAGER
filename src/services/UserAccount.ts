import { LoginRequestType, LoginResponseType, UserType } from "@/types/UserAccount";
import ApiService from "./Api";
import axiosInstance from "@/lib/client/axios";

export class UserService extends ApiService<UserType> {
  constructor() {
    super('/users');
  }
};

export class AuthService {
  constructor() {}

  public async login(data: LoginRequestType) {
    const response = await axiosInstance.post<LoginResponseType>('/auth/login/', { ...data, role: 'M' });
    return response.data;
  }
};