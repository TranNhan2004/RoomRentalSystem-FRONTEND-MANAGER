import { ContractType, RentalContractType } from "@/types/Contract.type";
import { ApiService } from "./Api.service";
import { UnknownQueryType } from "@/types/UnknownQuery.type";

export class ContractService extends ApiService<ContractType, UnknownQueryType> {
  constructor() {
    super("/app.contract/contracts");
  }
}

export class RentalContractService extends ApiService<RentalContractType, UnknownQueryType> {
  constructor() {
    super("/app.contract/rental_contracts");
  }
}

