import axiosInstance from "@/lib/client/axios";

class ApiService<T extends object> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async post(data: T) {
    const response = await axiosInstance.post<T>(this.endpoint, data);
    return response.data;
  }

  public async postFormData(data: T) {
    const response = await axiosInstance.post<T>(this.endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data; 
  }
  
  public async getMany() {
    const response = await axiosInstance.get<T[]>(this.endpoint);
    return response.data;
  }

  public async get(id: string) {
    const response = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }

  public async put(id: string, data: T) {
    const response = await axiosInstance.put<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  public async putFormData(id: string, data: T) {
    const response = await axiosInstance.put<T>(`${this.endpoint}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data; 
  }

  public async patch(id: string, data: T) {
    const response = await axiosInstance.patch<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  public async patchFormData(id: string, data: T) {
    const response = await axiosInstance.patch<T>(`${this.endpoint}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data; 
  }

  public async delete(id: string) {
    await axiosInstance.delete(`${this.endpoint}/${id}`);
  }
}

export default ApiService;