import axiosInstance from "@/lib/axios";
import changeCaseTo from "@/lib/changeCaseTo";
import formatDate from "@/lib/formatDate";

import UserType from "@/interfaces/user-account/User.interface";


class UserService {
  private static baseURL: string = "/users";

  private static smoothUploadedData(data: UserType) {
    const dataToSend: Record<string, unknown> = {...data};
  
    if (data.dateOfBirth) {
      dataToSend.dateOfBirth = formatDate(data.dateOfBirth, 'ymd');
      dataToSend.role = 'M';
    }  
    return changeCaseTo<UserType>(dataToSend, 'snake');
  }
  
  static async post(data: UserType) {
    let response;
    if (data instanceof FormData) {
      response = await axiosInstance.post<UserType>(
        `${UserService.baseURL}/`, 
        UserService.smoothUploadedData(data), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

    } else {
      response = await axiosInstance.post<UserType>(
        `${UserService.baseURL}/`, 
        UserService.smoothUploadedData(data)
      );
    }
    return changeCaseTo<UserType>(response.data, 'camel');
  }

  static async getMany() {
    const response = await axiosInstance.get<UserType[]>(`${UserService.baseURL}/`);
    return response.data.map(element => changeCaseTo<UserType>(element, 'camel'));
  }

  static async get(id: string) {
    const response = await axiosInstance.get<UserType>(`${UserService.baseURL}/${id}/`);
    return changeCaseTo<UserType>(response.data, 'camel');
  } 

  static async put(id: string, data: UserType) {
    const response = await axiosInstance.put<UserType>(
      `${UserService.baseURL}/${id}/`, 
      UserService.smoothUploadedData(data)
    );
    return changeCaseTo<UserType>(response.data, 'camel');
  }

  static async patch(id: string, data: UserType) {
    const response = await axiosInstance.patch<UserType>(
      `${UserService.baseURL}/${id}/`, 
      UserService.smoothUploadedData(data)
    );
    return changeCaseTo<UserType>(response.data, 'camel');
  }

  static async delete(id: string) {
    const response = await axiosInstance.delete<UserType>(`${UserService.baseURL}/${id}/`);
    return changeCaseTo<UserType>(response.data, 'camel');
  }
}

export default UserService;