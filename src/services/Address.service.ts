import { 
  CommuneQueryType, 
  CommuneType, 
  DistrictQueryType, 
  DistrictType, 
  ProvinceType 
} from "@/types/Address.type";
import { ApiService } from "./Api.service";
import { UnknownQueryType } from "@/types/UnknownQuery.type";


class ProvinceService extends ApiService<ProvinceType, UnknownQueryType> {
  constructor() {
    super('/app.address/provinces');
  }
}

class DistrictService extends ApiService<DistrictType, DistrictQueryType> {
  constructor() {
    super('/app.address/districts');
  }
}

class CommuneService extends ApiService<CommuneType, CommuneQueryType> {
  constructor() {
    super('/app.address/communes');
  }
}

export const provinceService = new ProvinceService();
export const districtService = new DistrictService();
export const communeService = new CommuneService();