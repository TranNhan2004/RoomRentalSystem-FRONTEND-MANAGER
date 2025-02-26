import { 
  CommuneQueryType, 
  CommuneType, 
  DistrictQueryType, 
  DistrictType, 
  ProvinceType 
} from "@/types/Address.type";
import { ApiService } from "./Api.service";
import { UnknownQueryType } from "@/types/UnknownQuery.type";


export class ProvinceService extends ApiService<ProvinceType, UnknownQueryType> {
  constructor() {
    super('/app.address/provinces');
  }
}

export class DistrictService extends ApiService<DistrictType, DistrictQueryType> {
  constructor() {
    super('/app.address/districts');
  }
}

export class CommuneService extends ApiService<CommuneType, CommuneQueryType> {
  constructor() {
    super('/app.address/communes');
  }
}