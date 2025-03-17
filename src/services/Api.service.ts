import { axiosInstance } from "@/lib/client/axios";
import { isValidQueryValue } from "@/lib/client/isInvalidQueryValue";

export class ApiService<T extends object, Q extends object> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected async _toFormData(data: T) {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key];
      if (!isValidQueryValue(value)) {
        continue;
      }

      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    }
    return formData;
  }

  protected async getFullURLWithParams(params: Q = {} as Q) {
    let fullParams = '?';
    for (const key in params) {
      if (!isValidQueryValue(params[key])) {
        continue;
      }

      if (params[key] instanceof Array) {
        for (const value of params[key]) {
          if (!isValidQueryValue(value)) {
            continue;
          }

          fullParams += `${key}=${value}&`;
        }

      } else {
        fullParams += `${key}=${params[key]}&`;
      }
    }

    return `${this.endpoint}/${fullParams !== '?' ? fullParams.slice(0, -1) : ''}`;
  }

  public async post(data: T, useFormData?: boolean) {
    const response = useFormData ?
                      await axiosInstance.post<T>(`${this.endpoint}/`, await this._toFormData(data), {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                      }) :
                      await axiosInstance.post<T>(`${this.endpoint}/`, data); 
    return response.data;
  }

  public async getMany(params: Q = {} as Q) {
    const response = await axiosInstance.get<T[]>(await this.getFullURLWithParams(params));
    return response.data;
  }

  public async get(id: string) {
    const response = await axiosInstance.get<T>(`${this.endpoint}/${id}/`);
    return response.data;
  }

  public async patch(id: string, data: T, useFormData?: boolean) {
    const response = useFormData ?
                      await axiosInstance.patch<T>(`${this.endpoint}/${id}/`, await this._toFormData(data), {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                      }) :
                      await axiosInstance.patch<T>(`${this.endpoint}/${id}/`, data);
    return response.data;
  }

  public async delete(id: string) {
    const response = await axiosInstance.delete<T>(`${this.endpoint}/${id}/`);
    return response.data;
  }
}