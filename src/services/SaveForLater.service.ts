import { SaveForLaterType } from "@/types/SaveForLater.type";
import { ApiService } from "./Api.service";

export class SaveForLaterService extends ApiService<SaveForLaterType, SaveForLaterType> {
  constructor() {
    super('/app.save-for-later/save-for-later');
  }
};

export const saveForLaterService = new SaveForLaterService();