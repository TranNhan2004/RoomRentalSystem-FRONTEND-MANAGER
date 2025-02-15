import { LoginRequestType, LoginResponseType } from "@/interfaces/user-account/Login.interface";
import axiosInstance from "@/lib/axios";
import changeCaseTo from "@/lib/changeCaseTo";
import axios from "axios";
import { removeCookie, setCookie } from "typescript-cookie";

class AuthService {
  static async login(data: LoginRequestType) {
    const loginAxiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      timeout: 10000
    });

    try {
      const response = await loginAxiosInstance.post<LoginResponseType>('/login/', data);
      const camelData = changeCaseTo<LoginResponseType>(response.data, 'camel');

      setCookie('access_token', camelData.access, { 
        expires: 60 * 60, 
        secure: true,
        path: '/',
        sameSite: 'none'
      });
      localStorage.setItem('id', camelData.id ?? '');
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}/`;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.statusText);
      } else {
        throw new Error('An error occurred');
      }
    }
  }

  static async logout() {
    await axiosInstance.post('/logout/', {});
    removeCookie('access_token');
    localStorage.removeItem('id');
  }
}

export default AuthService;