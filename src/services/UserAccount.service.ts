import { 
  LoginRequestType, 
  LoginResponseType, 
  ResetPasswordRequestAfterType, 
  ResetPasswordRequestBeforeType, 
  UserType 
} from "@/types/UserAccount.type";
import { ApiServiceWithFormData } from "./Api.service";
import axiosInstance from "@/lib/client/axios";
import { UnknownQueryType } from "@/types/UnknownQuery.type";

export class UserService extends ApiServiceWithFormData<UserType, UnknownQueryType> {
  constructor() {
    super('/app.user-account/users');
  }
};

export class AuthService {
  constructor() {}

  public async login(data: LoginRequestType) {
    const response = await axiosInstance.post<LoginResponseType>(
      '/app.user-account/auth/login/', 
      { ...data, role: 'M' }
    );
    return response.data;
  }

  public async getResetPasswordURL(data: ResetPasswordRequestBeforeType) {
    const response = await axiosInstance.post('/app.user-account/auth/reset-password/', data);
    return response.data;
  }

  public async resetPassword(data: ResetPasswordRequestAfterType, uidb64: string, token: string) {
    const response = await axiosInstance.post(
      `/app.user-account/auth/reset-password-confirm/${uidb64}/${token}/`,
      data
    );
    return response.data;
  }
};