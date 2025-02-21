import { ReviewQueryType, ReviewType } from "@/types/Review";
import { ApiService } from "./Api";

export class ReviewService extends ApiService<ReviewType, ReviewQueryType> {
  constructor() {
    super('/reviews');
  }
};