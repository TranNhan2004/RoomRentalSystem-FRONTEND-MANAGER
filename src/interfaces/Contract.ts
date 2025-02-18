export interface ContractType {
  id?: string;
  document?: string;
  rental_room?: string;
  created_at?: Date;
};

export interface RentalContractType {
  id?: number;
  start_date?: Date;
  end_date?: Date;
  contract?: string;
  renter?: string;
  created_at?: Date;
}; 