import { ContractType, RentalContractType } from "@/types/Contract";
import { ApiService } from "./Api";
import { UnknownQueryType } from "@/types/UnknownQuery";

export class ContractService extends ApiService<ContractType, UnknownQueryType> {
  constructor() {
    super("/contracts");
  }
}

export class RentalContractService extends ApiService<RentalContractType, UnknownQueryType> {
  constructor() {
    super("/rental_contracts");
  }
}