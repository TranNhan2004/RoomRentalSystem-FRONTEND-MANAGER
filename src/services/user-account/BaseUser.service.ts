import axiosInstance from "@/lib/axios";
import changeCaseTo from "@/lib/changeCaseTo";
import formatDate from "@/lib/formatDate";

import BaseUserType from "@/interfaces/user-account/BaseUser.interface";


class BaseUserService {
  private static baseURL: string = "/base-users";

  private static smoothUploadedData(data: BaseUserType | Partial<BaseUserType>) {
    const dataToSend: Record<string, unknown> = {...data};
  
    if (data.dateOfBirth) {
      dataToSend.dateOfBirth = formatDate(data.dateOfBirth, 'ymd');
    }  
    return changeCaseTo(dataToSend, 'snake');
  }
  
  static async post(data: BaseUserType): Promise<BaseUserType> {
    let response;
    if (data instanceof FormData) {
      response = await axiosInstance.post(
        `${BaseUserService.baseURL}/`, 
        BaseUserService.smoothUploadedData(data), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

    } else {
      response = await axiosInstance.post(
        `${BaseUserService.baseURL}/`, 
        BaseUserService.smoothUploadedData(data)
      );
    }

    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async getMany(): Promise<BaseUserType[]> {
    const response = await axiosInstance.get(`${BaseUserService.baseURL}/`);
    (response.data as Record<string, unknown>[]).forEach(element => changeCaseTo(element, 'camel'));
    return response.data;
  }

  static async get(id: string): Promise<BaseUserType> {
    const response = await axiosInstance.get(`${BaseUserService.baseURL}/${id}/`);
    changeCaseTo(response.data, 'camel');
    return response.data;
  } 

  static async put(id: string, data: BaseUserType): Promise<BaseUserType> {
    const response = await axiosInstance.put(
      `${BaseUserService.baseURL}/${id}/`, 
      BaseUserService.smoothUploadedData(data)
    );
    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async patch(id: string, data: Partial<BaseUserType>): Promise<BaseUserType> {
    const response = await axiosInstance.patch(
      `${BaseUserService.baseURL}/${id}/`, 
      BaseUserService.smoothUploadedData(data)
    );
    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async delete(id: string): Promise<BaseUserType> {
    const response = await axiosInstance.delete(`${BaseUserService.baseURL}/${id}/`);
    changeCaseTo(response.data, 'camel');
    return response.data;
  }
}

export default BaseUserService;