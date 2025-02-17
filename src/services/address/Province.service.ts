import ApiService from "../Api.service";



class ProvinceService extends ApiService {
  protected static endpoint: string = '/provinces';

  static async post<ProvinceType>(data: ) {
    return await super.post<>(data);
  }


}

export default ProvinceService;