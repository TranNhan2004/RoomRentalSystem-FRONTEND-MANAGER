import axios from 'axios';
import { getAccessToken, getRefreshedAccessToken } from '@/lib/auth-token/client';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true,  
  timeout: 10000,
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
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401) {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      const accessToken = await getRefreshedAccessToken();
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      return axios(originalRequest);
    }
    console.log(JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default axiosInstance;
