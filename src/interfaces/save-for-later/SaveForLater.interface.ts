interface SaveForLaterType {
  id?: string;
  notes?: string
  rentalRoom?: string;
  savedBy?: string;
  createdAt?: Date;
  [key: string]: unknown;
}

export default SaveForLaterType;