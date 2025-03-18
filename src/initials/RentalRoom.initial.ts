import { 
  ChargesType,
  RoomImageType,
  RentalRoomQueryType, 
  RentalRoomType,
} from "@/types/RentalRoom.type";


export const INITIAL_RENTAL_ROOM: RentalRoomType = {
  id: '',
  name: '',
  commune: '',
  additional_address: '',
  closing_time: '',
  total_number: 1,
  average_rating: 0,
  further_description: '',
} as const;

export const INITIAL_ROOM_IMAGE: RoomImageType = {
  id: '',
  image: '',
  rental_room: '',
} as const;

export const INITIAL_CHARGES: ChargesType = {
  id: '',
  rental_room: '',
  room_charge: 1000000,
  deposit: 500000,
  electricity_charge: 4000,
  water_charge: 12000,
  wifi_charge: -1,
  rubbish_charge: 10000,
  start_date: new Date(),
} as const;

export const INITIAL_RENTAL_ROOM_QUERY: RentalRoomQueryType = {
  commune: '',
  lessor: '',
  _province: '',
  _district: '',
} as const;