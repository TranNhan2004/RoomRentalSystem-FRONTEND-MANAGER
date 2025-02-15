import axios from 'axios';
import { getCookie, setCookie } from 'typescript-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  
  timeout: 10000,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh/`);
        const { access } = response.data;

        setCookie('access_token', access, { 
          expires: 60 * 60, 
          secure: true,
          path: '/',
          sameSite: 'none',
        });
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return axios(originalRequest);

      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
