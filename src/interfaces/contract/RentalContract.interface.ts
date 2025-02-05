interface RentalContractType {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  contract?: string;
  rentedBy?: string;
  createdAt?: Date;
  [key: string]: unknown;
}

export default RentalContractType; 