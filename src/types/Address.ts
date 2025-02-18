export type ProvinceType = {
  id?: string;
  name?: string;
}

export type DistrictType = {
  id?: string;
  name?: string;
  province?: string;
}

export type CommuneType = {
  id?: string;
  name?: string;
  district?: string;
}