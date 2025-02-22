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
    super('/rental-rooms');
  }
};

export class RoomChargesListService extends 
ApiService<
  RoomChargesListType, 
  RoomChargesListQueryType
> {

  constructor() {
    super('/room-charges-lists');
  }
};

export class ElectricityWaterChargesListService extends 
ApiService<
  ElectricityWaterChargesListType, 
  ElectricityWaterChargesListQueryType
> {

  constructor() {
    super('/electricity-water-charges-lists');
  }
};

export class OtherChargesListService extends 
ApiService<
  OtherChargesListType, 
  OtherChargesListQueryType
> {

  constructor() {
    super('/other-charges-lists');
  }
};

export class RentalRoomImageService extends 
ApiServiceWithFormData<
  RentalRoomImageType, 
  RentalRoomImageQueryType
> {

  constructor() {
    super('/rental-room-images');
  }
};