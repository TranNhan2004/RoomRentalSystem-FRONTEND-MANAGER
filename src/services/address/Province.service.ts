import axiosInstance from "@/lib/axios";
import changeCaseTo from "@/lib/changeCaseTo";
import ProvinceType from "@/interfaces/address/Province.interface";


class ProvinceService {
  private static baseURL: string = "/provinces";

  private static smoothUploadedData(data: ProvinceType | Partial<ProvinceType>) { 
    return changeCaseTo(data, 'snake');
  }
  
  static async post(data: ProvinceType): Promise<ProvinceType> {
    const response = await axiosInstance.post(
      `${ProvinceService.baseURL}/`, 
      ProvinceService.smoothUploadedData(data)
    );

    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async getMany(): Promise<ProvinceType[]> {
    const response = await axiosInstance.get(`${ProvinceService.baseURL}/`);
    (response.data as Record<string, unknown>[]).forEach(element => changeCaseTo(element, 'camel'));
    return response.data;
  }

  static async get(id: string): Promise<ProvinceType> {
    const response = await axiosInstance.get(`${ProvinceService.baseURL}/${id}/`);
    changeCaseTo(response.data, 'camel');
    return response.data;
  } 

  static async put(id: string, data: ProvinceType): Promise<ProvinceType> {
    const response = await axiosInstance.put(
      `${ProvinceService.baseURL}/${id}/`, 
      ProvinceService.smoothUploadedData(data)
    );
    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async patch(id: string, data: Partial<ProvinceType>): Promise<ProvinceType> {
    const response = await axiosInstance.patch(
      `${ProvinceService.baseURL}/${id}/`, 
      ProvinceService.smoothUploadedData(data)
    );
    changeCaseTo(response.data, 'camel');
    return response.data;
  }

  static async delete(id: string): Promise<ProvinceType> {
    const response = await axiosInstance.delete(`${ProvinceService.baseURL}/${id}/`);
    changeCaseTo(response.data, 'camel');
    return response.data;
  }
}

export default ProvinceService;