import { LoginRequestType, LoginResponseType } from "@/interfaces/user-account/Login.interface";
import axiosInstance from "@/lib/axios";
import changeCaseTo from "@/lib/changeCaseTo";
import axios from "axios";

class AuthService {
  static async login(data: LoginRequestType) {
    const loginAxiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      const response = await loginAxiosInstance.post<LoginResponseType>('/login/', data);
      return changeCaseTo<LoginResponseType>(response.data, 'camel');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || 'Unknown Error');
      } else {
        throw new Error('An error occurred');
      }
    }
  }

  static async logout(): Promise<void> {
    await axiosInstance.post('/logout/', {});
  }
}

export default AuthService;