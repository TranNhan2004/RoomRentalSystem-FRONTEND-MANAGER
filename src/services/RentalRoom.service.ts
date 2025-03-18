import { 
  ChargesListQueryType,
  ChargesListType,
  RentalRoomImageQueryType, 
  RentalRoomImageType, 
  RentalRoomQueryType, 
  RentalRoomType, 
} from "@/types/RentalRoom.type";
import { ApiService } from "./Api.service";

export class RentalRoomService extends 
ApiService<
  RentalRoomType, 
  RentalRoomQueryType
> {
  constructor() {
    super('/app.rental-room/rental-rooms');
  }
};

export class ChargesListService extends 
ApiService<
  ChargesListType, 
  ChargesListQueryType
> {

  constructor() {
    super('/app.rental-room/charges-lists');
  }
};

export class RentalRoomImageService extends 
ApiService<
  RentalRoomImageType, 
  RentalRoomImageQueryType
> {

  constructor() {
    super('/app.rental-room/rental-room-images');
  }

  public async post(data: RentalRoomImageType) {
    return await super.post(data, true);
  }

  public async patch(id: string, data: RentalRoomImageType) {
    return await super.patch(id, data, true);
  }
};

export const rentalRoomService = new RentalRoomService();
export const chargesListService = new ChargesListService();
export const rentalRoomImageService = new RentalRoomImageService();