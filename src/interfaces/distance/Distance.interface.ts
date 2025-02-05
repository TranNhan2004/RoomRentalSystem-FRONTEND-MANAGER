interface DistanceType {
  id?: string;
  value?: number;
  durationInMinutes?: number;
  rentalRoom?: string;
  renter?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export default DistanceType;