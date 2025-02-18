export interface ProvinceType {
  id?: string;
  name?: string;
};

export interface DistrictType {
  id?: string;
  name?: string;
  province?: string;
};

export interface CommuneType {
  id?: string;
  name?: string;
  district?: string;
};