export type SaveForLaterType = {
  id?: string;
  notes?: string
  rental_room?: string;
  renter?: string;
  created_at?: Date;
}

export type SaveForLaterQueryType = Pick<SaveForLaterType, 'renter'>;