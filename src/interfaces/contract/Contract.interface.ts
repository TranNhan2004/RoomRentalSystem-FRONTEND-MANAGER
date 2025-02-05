interface ContractType {
  id?: string;
  document?: string;
  rentalRoom?: string;
  createdAt?: Date;
  [key: string]: unknown;
}

export default ContractType;