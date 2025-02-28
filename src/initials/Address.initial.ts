import { 
  CommuneQueryType, 
  CommuneType, 
  DistrictQueryType, 
  DistrictType, 
  ProvinceType 
} from "@/types/Address.type";

export const INITIAL_PROVINCE: ProvinceType = {
  id: '',
  name: ''
} as const;

export const INITIAL_DISTRICT: DistrictType = {
  id: '',
  name: '',
  province: ''
} as const;

export const INITIAL_DISTRICT_QUERY: DistrictQueryType = {
  province: ''
} as const;

export const INITIAL_COMMUNE: CommuneType = {
  id: '',
  name: '',
  district: ''
} as const;

export const INITIAL_COMMUNE_QUERY: CommuneQueryType = {
  district: ''
} as const;