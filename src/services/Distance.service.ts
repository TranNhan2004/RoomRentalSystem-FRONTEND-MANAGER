import { DistanceType } from "@/types/Distance.type";
import { ApiService } from "./Api.service";
import { UnknownQueryType } from "@/types/UnknownQuery.type";

export class DistanceService extends ApiService<DistanceType, UnknownQueryType> {
  constructor() {
    super('/distances');
  }
}