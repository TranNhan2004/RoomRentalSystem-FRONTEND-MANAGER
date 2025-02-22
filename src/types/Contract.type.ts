export type ContractType = {
  id?: string;
  document?: string;
  rental_room?: string;
  created_at?: Date;
}

export type RentalContractType = {
  id?: number;
  start_date?: Date;
  end_date?: Date;
  contract?: string;
  renter?: string;
  created_at?: Date;
} 