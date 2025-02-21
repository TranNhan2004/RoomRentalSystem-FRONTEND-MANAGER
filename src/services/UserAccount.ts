import { 
  LoginRequestType, 
  LoginResponseType, 
  ResetPasswordRequestAfterType, 
  ResetPasswordRequestBeforeType, 
  UserType 
} from "@/types/UserAccount";
import { ApiServiceWithFormData } from "./Api";
import axiosInstance from "@/lib/client/axios";
import { UnknownQueryType } from "@/types/UnknownQuery";

export class UserService extends ApiServiceWithFormData<UserType, UnknownQueryType> {
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

  public async generateURLForResetPassword(data: ResetPasswordRequestBeforeType) {
    const response = await axiosInstance.post('/auth/reset-password/', data);
    return response.data;
  }

  public async resetPassword(data: ResetPasswordRequestAfterType, uidb64: string, token: string) {
    const response = await axiosInstance.post(`/auth/reset-password-confirm/${uidb64}/${token}/`, data);
    return response.data;
  }
};