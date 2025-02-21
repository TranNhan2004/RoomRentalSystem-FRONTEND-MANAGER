export type ReviewType = {
  id?: string;
  comment?: string;
  rating?: number;
  rental_room?: string;
  renter?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ReviewQueryType = Pick<ReviewType, 'rental_room' | 'renter'>;