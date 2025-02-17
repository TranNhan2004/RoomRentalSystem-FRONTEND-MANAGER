import axiosInstance from "@/lib/client/axios";

class ApiService {
  protected static endpoint: string = '';

  static async post<T extends object>(data: T) {
    const response = await axiosInstance.post<T>(ApiService.endpoint, data);
    return response.data;
  }

  static async postFormData<T extends object>(data: T) {
    const response = await axiosInstance.post<T>(ApiService.endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data; 
  }
  
  static async getMany<T extends object>() {
    const response = await axiosInstance.get<T[]>(ApiService.endpoint);
    return response.data;
  }

  static async get<T extends object>(id: string) {
    const response = await axiosInstance.get<T>(`${ApiService.endpoint}/${id}`);
    return response.data;
  }

  static async put<T extends object>(id: string, data: T) {
    const response = await axiosInstance.put<T>(`${ApiService.endpoint}/${id}`, data);
    return response.data;
  }

  static async putFormData<T extends object>(id: string, data: T) {
    const response = await axiosInstance.put<T>(ApiService.endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data; 
  }

  static async patch<T extends object>(id: string, data: T) {
    const response = await axiosInstance.patch<T>(`${ApiService.endpoint}/${id}`, data);
    return response.data;
  }

  static async patchFormData<T extends object>(id: string, data: T) {
    const response = await axiosInstance.patch<T>(ApiService.endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data; 
  }

  static async delete(id: string) {
    await axiosInstance.delete(`${ApiService.endpoint}/${id}`);
  }
}

export default ApiService;