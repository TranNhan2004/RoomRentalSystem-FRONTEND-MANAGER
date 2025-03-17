import { 
  ChangePasswordType,
  LoginRequestType, 
  LoginResponseType, 
  ResetPasswordRequestAfterType, 
  ResetPasswordRequestBeforeType, 
  UserQueryType, 
  UserType 
} from "@/types/UserAccount.type";
import { ApiService } from "./Api.service";
import { axiosInstance } from "@/lib/client/axios";
import { formatDate } from "@/lib/client/format";

class UserService extends ApiService<UserType, UserQueryType> {
  constructor() {
    super('/app.user-account/users');
  }

  private async smoothData(data: UserType) {
    const dataToSend: Record<string, unknown> = { ...data };
    if (data.date_of_birth) {
      dataToSend.date_of_birth = formatDate(data.date_of_birth, 'ymd');
    }
    return dataToSend;
  }

  public async post(data: UserType) {
    return await super.post(await this.smoothData(data));
  }

  public async patch(id: string, data: UserType) {
    return await super.patch(id, await this.smoothData(data));
  }

  public async changePassword(id: string, data: ChangePasswordType) {
    const response = await axiosInstance.patch(`/app.user-account/change-password/${id}/`, data);
    return response.data;
  }
};

class AuthService {
  constructor() {}

  public async login(data: LoginRequestType) {
    data.role = 'MANAGER';
    const response = await axiosInstance.post<LoginResponseType>('/app.user-account/auth/login/', data);
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


export const userService = new UserService();

export const authService = new AuthService();