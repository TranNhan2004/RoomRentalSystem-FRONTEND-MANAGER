import { DistanceType } from "@/types/Distance";
import { ApiService } from "./Api";
import { UnknownQueryType } from "@/types/UnknownQuery";

export class DistanceService extends ApiService<DistanceType, UnknownQueryType> {
  constructor() {
    super('/distances');
  }
}