import { 
  ElectricityWaterChargesListType, 
  OtherChargesListType, 
  RentalRoomImageType, 
  RentalRoomType, 
  RoomChargesListType 
} from "@/types/RentalRoom";
import { ApiService, ApiServiceWithFormData } from "./Api";


export class RentalRoomService extends ApiService<RentalRoomType> {
  constructor() {
    super('/rental-rooms');
  }
};

export class RoomChargesListService extends ApiService<RoomChargesListType> {
  constructor() {
    super('/room-charges-lists');
  }
};

export class ElectricityWaterChargesListService extends ApiService<ElectricityWaterChargesListType> {
  constructor() {
    super('/electricity-water-charges-lists');
  }
};

export class OtherChargesListService extends ApiService<OtherChargesListType> {
  constructor() {
    super('/other-charges-lists');
  }
};

export class RentalRoomImageService extends ApiServiceWithFormData<RentalRoomImageType> {
  constructor() {
    super('/rental-room-images');
  }
};