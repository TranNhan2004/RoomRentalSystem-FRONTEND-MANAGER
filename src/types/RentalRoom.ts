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
  created_at?: Date;
  updated_at?: Date;
}

export type RoomChargesListType = {
  id?: string;
  rental_room?: string;
  room_charges?: number;
  deposit?: number;
  start_date?: Date;
  end_date?: Date;
}

export type ElectricityWaterChargesListType = {
  id?: string;
  rental_room?: string;
  electricity_charges_type?: 'unit' | 'person';
  electricity_charges?: number;
  water_charges_type?: 'unit' | 'person';
  water_charges?: number;
  start_date?: Date;
  end_date?: Date;
}

export type OtherChargesListType = {
  id?: string;
  rental_room?: string;
  wifi_charges?: number;
  rubbish_charges?: number;
  start_date?: Date;
  end_date?: Date;
}

export type RentalRoomImageType = {
  id?: string;
  rental_room?: string;
  image?: string;
}