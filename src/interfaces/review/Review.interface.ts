interface ReviewsType {
  id?: string;
  comment?: string;
  rating?: number;
  rentalRoom?: string;
  reviewedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export default ReviewsType;