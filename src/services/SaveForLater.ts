import { SaveForLaterType } from "@/types/SaveForLater";
import { ApiService } from "./Api";

export class SaveForLaterService extends ApiService<SaveForLaterType, SaveForLaterType> {
  constructor() {
    super('/save-for-later');
  }
};