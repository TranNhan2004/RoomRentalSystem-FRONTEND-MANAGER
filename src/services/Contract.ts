import { ContractType, RentalContractType } from "@/types/Contract";
import { ApiService } from "./Api";

export class ContractService extends ApiService<ContractType> {
  constructor() {
    super("/contracts");
  }
}

export class RentalContractService extends ApiService<RentalContractType> {
  constructor() {
    super("/rental_contracts");
  }
}