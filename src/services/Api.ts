import axiosInstance from "@/lib/client/axios";

export class ApiService<T extends object, Q extends object> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async post(data: T) {
    const response = await axiosInstance.post<T>(`${this.endpoint}/`, data);
    return response.data;
  }

  public async getMany(params: Q = <Q>{}) {
    const response = await axiosInstance.get<T[]>(`${this.endpoint}/`, { params: params });
    return response.data;
  }

  public async get(id: string) {
    const response = await axiosInstance.get<T>(`${this.endpoint}/${id}/`);
    return response.data;
  }

  public async patch(id: string, data: T) {
    const response = await axiosInstance.patch<T>(`${this.endpoint}/${id}/`, data);
    return response.data;
  }

  public async delete(id: string) {
    await axiosInstance.delete(`${this.endpoint}/${id}/`);
  }
}


export class ApiServiceWithFormData<T extends object, Q extends object> extends ApiService<T, Q> {
  constructor(endpoint: string) {
    super(endpoint);
  }

  private async _toFormData(data: T) {
    const formData = new FormData();
    for (const key in data) {
      if (Object.hasOwn(data, key)) {
        formData.append(key, data[key] as string);
      }
    }
    console.log(formData);
    return formData;
  }

  public async postFormData(data: T) {
    const response = await axiosInstance.post<T>(this.endpoint, this._toFormData(data), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data; 
  }

  public async patchFormData(id: string, data: T) {
    const response = await axiosInstance.patch<T>(`${this.endpoint}/${id}`, this._toFormData(data), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data; 
  }
}