import { ReviewQueryType, ReviewType } from "@/types/Review.type";
import { ApiService } from "./Api.service";

export class ReviewService extends ApiService<ReviewType, ReviewQueryType> {
  constructor() {
    super('/reviews');
  }
};