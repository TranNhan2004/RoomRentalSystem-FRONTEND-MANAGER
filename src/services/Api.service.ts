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
      formData.append(key, data[key] as string);
    }
    console.log(formData);
    return formData;
  }

  protected async getFullURLWithParams(params: Q = {} as Q) {
    let fullParams = '?';
    for (const key in params) {
      if (!isValidQueryValue(params[key])) {
        continue;
      }

      if (params[key] instanceof Array) {
        for (const subKey in params[key]) {
          if (!isValidQueryValue(params[key][subKey])) {
            continue;
          }

          fullParams += `${key}=${params[key][subKey]}&`;
        }

      } else {
        fullParams += `${key}=${params[key]}&`;
      }
    }

    return `${this.endpoint}/${fullParams !== '?' ? fullParams.slice(0, -1) : ''}`;
  }

  public async post(data: T, useFormData?: boolean) {
    const response = useFormData ?
                      await axiosInstance.post<T>(this.endpoint, this._toFormData(data), {
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
                      await axiosInstance.patch<T>(`${this.endpoint}/${id}`, this._toFormData(data), {
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