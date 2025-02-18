import { ProvinceType } from "@/interfaces/Address";
import ApiService from "./Api";

export class ProvinceService extends ApiService<ProvinceType> {
  constructor() {
    super('/provinces');
  }
};