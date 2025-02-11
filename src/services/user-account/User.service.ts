import axiosInstance from "@/lib/axios";
import changeCaseTo from "@/lib/changeCaseTo";
import formatDate from "@/lib/formatDate";

import UserType from "@/interfaces/user-account/User.interface";


class UserService {
  private static baseURL: string = "/users";

  private static smoothUploadedData(data: UserType | Partial<UserType>) {
    const dataToSend: Record<string, unknown> = {...data};
  
    if (data.dateOfBirth) {
      dataToSend.dateOfBirth = formatDate(data.dateOfBirth, 'ymd');
      dataToSend.role = 'M';
    }  
    return changeCaseTo(dataToSend, 'snake');
  }
  
  static async post(data: UserType): Promise<UserType> {
    let response;
    if (data instanceof FormData) {
      response = await axiosInstance.post(
        `${UserService.baseURL}/`, 
        UserService.smoothUploadedData(data), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

    } else {
      response = await axiosInstance.post(
        `${UserService.baseURL}/`, 
        UserService.smoothUploadedData(data)
      );
    }

    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async getMany(): Promise<UserType[]> {
    const response = await axiosInstance.get(`${UserService.baseURL}/`);
    (response.data as Record<string, unknown>[]).forEach(element => changeCaseTo(element, 'camel'));
    return response.data;
  }

  static async get(id: string): Promise<UserType> {
    const response = await axiosInstance.get(`${UserService.baseURL}/${id}/`);
    changeCaseTo(response.data, 'camel');
    return response.data;
  } 

  static async put(id: string, data: UserType): Promise<UserType> {
    const response = await axiosInstance.put(
      `${UserService.baseURL}/${id}/`, 
      UserService.smoothUploadedData(data)
    );
    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async patch(id: string, data: Partial<UserType>): Promise<UserType> {
    const response = await axiosInstance.patch(
      `${UserService.baseURL}/${id}/`, 
      UserService.smoothUploadedData(data)
    );
    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async delete(id: string): Promise<UserType> {
    const response = await axiosInstance.delete(`${UserService.baseURL}/${id}/`);
    changeCaseTo(response.data, 'camel');
    return response.data;
  }
}

export default UserService;