import { DistanceType } from "@/types/Distance";
import { ApiService } from "./Api";

export class DistanceService extends ApiService<DistanceType> {
  constructor() {
    super('/distances');
  }
}