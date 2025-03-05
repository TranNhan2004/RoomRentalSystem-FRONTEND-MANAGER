import { DistrictType, ProvinceType } from "./Address.type";

export type RentalRoomType = {
  id?: string;
  name?: string;
  commune?: string;
  additional_address?: string;
  closing_time?: string;
  max_occupancy_per_room?: number;
  total_number?: number;
  empty_number?: number;
  further_description?: string;
  average_rating?: number;
  lessor?: string;
  manager?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type RentalRoomQueryType = {
  commune?: RentalRoomType['commune'];
  lessor?: RentalRoomType['lessor'];
  manager?: RentalRoomType['manager'];
  manager_is_null?: boolean;
  is_active?: RentalRoomType['is_active'];
  _province?: ProvinceType['id'];
  _district?: DistrictType['id'];
};

export type ChargesListType = {
  id?: string;
  rental_room?: string;
  room_charges?: number;
  deposit?: number;
  electricity_charges?: number;
  water_charges?: number;
  wifi_charges?: number;
  rubbish_charges?: number;
  start_date?: Date;
  end_date?: Date;
}

export type ChargesListQueryType = {
  rental_room?: ChargesListType['rental_room'];
}

export type RentalRoomImageType = {
  id?: string;
  rental_room?: string;
  image?: string;
}

export type RentalRoomImageQueryType = {
  rental_room?: RentalRoomImageType['rental_room'];
}