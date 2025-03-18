import { DistrictType, ProvinceType } from "./Address.type";

export type RentalRoomType = {
  id?: string;
  name?: string;
  commune?: string;
  additional_address?: string;
  closing_time?: string;
  total_number?: number;
  further_description?: string;
  average_rating?: number;
  lessor?: string;
  manager?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type RentalRoomQueryType = {
  commune?: RentalRoomType['commune'];
  lessor?: RentalRoomType['lessor'];
  manager_is_null?: boolean;
  manager?: string;
  _province?: ProvinceType['id'];
  _district?: DistrictType['id'];
};

export type ChargesListType = {
  id?: string;
  rental_room?: string;
  room_charge?: number;
  deposit?: number;
  electricity_charge?: number;
  water_charge?: number;
  wifi_charge?: number;
  rubbish_charge?: number;
  start_date?: Date;
  end_date?: Date;
}

export type RentalRoomImageType = {
  id?: string;
  rental_room?: string;
  image?: File | string;
}

export type RentalRoomImageQueryType = {
  rental_room?: RentalRoomImageType['rental_room'];
  mode?: 'first' | 'many';
}

export type ChargesListQueryType = {
  rental_room?: ChargesListType['rental_room'];
  from_date?: Date | string;
  to_date?: Date | string;
  mode?: 'first' | 'many';
}