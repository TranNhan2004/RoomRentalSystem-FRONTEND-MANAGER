import { 
  ElectricityWaterChargesListQueryType,
  ElectricityWaterChargesListType, 
  OtherChargesListQueryType, 
  OtherChargesListType, 
  RentalRoomImageQueryType, 
  RentalRoomImageType, 
  RentalRoomType, 
  RoomChargesListQueryType, 
  RoomChargesListType 
} from "@/types/RentalRoom.type";
import { ApiService, ApiServiceWithFormData } from "./Api.service";
import { UnknownQueryType } from "@/types/UnknownQuery.type";


export class RentalRoomService extends ApiService<RentalRoomType, UnknownQueryType> {
  constructor() {
    super('/app.rental-room/rental-rooms');
  }
};

export class RoomChargesListService extends 
ApiService<
  RoomChargesListType, 
  RoomChargesListQueryType
> {

  constructor() {
    super('/app.rental-room/room-charges-lists');
  }
};

export class ElectricityWaterChargesListService extends 
ApiService<
  ElectricityWaterChargesListType, 
  ElectricityWaterChargesListQueryType
> {

  constructor() {
    super('/app.rental-room/electricity-water-charges-lists');
  }
};

export class OtherChargesListService extends 
ApiService<
  OtherChargesListType, 
  OtherChargesListQueryType
> {

  constructor() {
    super('/app.rental-room/other-charges-lists');
  }
};

export class RentalRoomImageService extends 
ApiServiceWithFormData<
  RentalRoomImageType, 
  RentalRoomImageQueryType
> {

  constructor() {
    super('/app.rental-room/rental-room-images');
  }
};