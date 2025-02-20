import { CommuneType, DistrictType, ProvinceType } from "@/types/Address";
import { ApiService } from "./Api";


export class ProvinceService extends ApiService<ProvinceType> {
  constructor() {
    super('/provinces');
  }
}

export class DistrictService extends ApiService<DistrictType> {
  constructor() {
    super('/districts');
  }
}

export class CommuneService extends ApiService<CommuneType> {
  constructor() {
    super('/communes');
  }
}