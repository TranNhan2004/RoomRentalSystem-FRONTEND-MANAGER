import axiosInstance from "@/lib/axios";
import changeCaseTo from "@/lib/changeCaseTo";
import ProvinceType from "@/interfaces/address/Province.interface";


class ProvinceService {
  private static baseURL: string = "/provinces";

  static async post(data: ProvinceType) {
    const response = await axiosInstance.post<ProvinceType>(
      `${ProvinceService.baseURL}/`, 
      changeCaseTo<ProvinceType>(data, 'snake')
    );

    return changeCaseTo<ProvinceType>(response.data, 'camel');
  }

  static async getMany() {
    const response = await axiosInstance.get<ProvinceType[]>(`${ProvinceService.baseURL}/`);
    return response.data.map(element => changeCaseTo<ProvinceType>(element, 'camel'));
  }

  static async get(id: string) {
    const response = await axiosInstance.get(`${ProvinceService.baseURL}/${id}/`);
    return changeCaseTo<ProvinceType>(response.data, 'camel');
  } 

  static async put(id: string, data: ProvinceType) {
    const response = await axiosInstance.put<ProvinceType>(
      `${ProvinceService.baseURL}/${id}/`, 
      changeCaseTo<ProvinceType>(data, 'snake')
    );
    return changeCaseTo<ProvinceType>(response.data, 'camel');
  }

  static async patch(id: string, data: ProvinceType) {
    const response = await axiosInstance.patch<ProvinceType>(
      `${ProvinceService.baseURL}/${id}/`, 
      changeCaseTo<ProvinceType>(data, 'snake')
    );
    return changeCaseTo<ProvinceType>(response.data, 'camel');
  }

  static async delete(id: string) {
    const response = await axiosInstance.delete<ProvinceType>(`${ProvinceService.baseURL}/${id}/`);
    return changeCaseTo<ProvinceType>(response.data, 'camel');
  }
}

export default ProvinceService;