interface ChargesListType {
  id?: string;
  rentalRoom?: string;
  roomCharges?: number;
  electricityChargesType?: 'unit' | 'person';
  electricityCharges?: number;
  waterChargesType?: string;
  waterCharges?: 'unit' | 'person';
  wifiCharges?: number | null;
  rubbishCharges?: number;
  startDate?: Date;
  endDate?: Date;
}

export default ChargesListType;