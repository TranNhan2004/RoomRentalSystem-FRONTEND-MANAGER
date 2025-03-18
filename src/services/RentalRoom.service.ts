import { 
  ChargesQueryType,
  ChargesType,
  RoomImageQueryType, 
  RoomImageType, 
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

export class ChargesService extends 
ApiService<
  ChargesType, 
  ChargesQueryType
> {

  constructor() {
    super('/app.rental-room/charges');
  }
};

export class RoomImageService extends 
ApiService<
  RoomImageType, 
  RoomImageQueryType
> {

  constructor() {
    super('/app.rental-room/room-images');
  }

  public async post(data: RoomImageType) {
    return await super.post(data, true);
  }

  public async patch(id: string, data: RoomImageType) {
    return await super.patch(id, data, true);
  }
};

export const rentalRoomService = new RentalRoomService();
export const chargesService = new ChargesService();
export const roomImageService = new RoomImageService();