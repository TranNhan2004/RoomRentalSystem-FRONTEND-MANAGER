export type ProvinceType = {
  id?: string;
  name?: string;
}

export type DistrictType = {
  id?: string;
  name?: string;
  province?: string;
}

export type DistrictQueryType = Pick<DistrictType, 'province'>;

export type CommuneType = {
  id?: string;
  name?: string;
  district?: string;
}

export type CommuneQueryType = Pick<CommuneType, 'district'>;