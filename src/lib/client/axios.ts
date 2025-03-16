import axios from 'axios';
import { getAccessToken, resetAuthTokens, setAccessToken } from '@/lib/client/authToken';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, 
  withCredentials: true,
  timeout: 60000,
});

const refreshTokenAxiosIntance = axios.create({
  ...axiosInstance.defaults
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 100); 
    });
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(JSON.stringify(error.response));
  
    if (error.response && error.response.status === 401) {
      originalRequest._retry = true;
      
      try {
        const response = await refreshTokenAxiosIntance.post(
          '/app.user-account/auth/token/refresh/',
          { role: 'MANAGER' }
        );
        await setAccessToken(response.data.access);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        
      } catch {
        await resetAuthTokens();
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/login`;
      }
      
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);