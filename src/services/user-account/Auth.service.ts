import { LoginRequestType, LoginResponseType } from "@/interfaces/user-account/Login.interface";
import axiosInstance from "@/lib/client/axios";

class AuthService {
  static async login(data: LoginRequestType) {
    const response = await axiosInstance.post<LoginResponseType>('/auth/login/', { ...data, role: 'M' });
    return response.data;
  }
}

export default AuthService;