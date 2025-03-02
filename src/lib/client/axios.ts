import axios from 'axios';
import { getAccessToken, getRefreshedAccessToken, resetAuthTokens } from '@/lib/client/authToken';

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
      if (originalRequest._retry) {
        await resetAuthTokens();
      }

      originalRequest._retry = true;
      const accessToken = await getRefreshedAccessToken();
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
