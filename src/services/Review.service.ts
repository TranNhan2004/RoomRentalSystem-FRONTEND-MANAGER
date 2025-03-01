import { ReviewQueryType, ReviewType } from "@/types/Review.type";
import { ApiService } from "./Api.service";

class ReviewService extends ApiService<ReviewType, ReviewQueryType> {
  constructor() {
    super('/app.review/reviews');
  }
};


export const reviewService = new ReviewService();