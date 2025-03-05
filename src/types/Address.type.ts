export type ProvinceType = {
  id?: string;
  name?: string;
}

export type DistrictType = {
  id?: string;
  name?: string;
  province?: string;
}

export type DistrictQueryType = {
  province?: ProvinceType['id'];
}

export type CommuneType = {
  id?: string;
  name?: string;
  district?: string;
}

export type CommuneQueryType = {
  district?: DistrictType['id'];
  _province?: string;
}