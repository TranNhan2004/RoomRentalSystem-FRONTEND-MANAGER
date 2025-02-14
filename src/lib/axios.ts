import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error); 
//   }
// );


axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error.message);
  }
);

export default axiosInstance;