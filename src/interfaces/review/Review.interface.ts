interface ReviewsType {
  id?: string;
  comment?: string;
  rating?: number;
  rentalRoom?: string;
  reviewedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default ReviewsType;