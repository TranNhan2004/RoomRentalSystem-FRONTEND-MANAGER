import { ReviewType } from "@/types/Review";
import ApiService from "./Api";

export class ReviewService extends ApiService<ReviewType> {
  constructor() {
    super('/reviews');
  }
};