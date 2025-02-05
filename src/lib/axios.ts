import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
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
    if (error.response) {
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data); 

    } else if (error.request) {
      console.error('API Request Error:', error.request);
      return Promise.reject('Server did not respond. Please try again.');

    } else {
      console.error('API Config Error:', error.message);
      return Promise.reject(error.message);
    }
  }
);

export default axiosInstance;