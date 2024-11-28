export interface Authority {
  authority: string;
  has_video: boolean;
  has_voice: boolean;
  images: boolean;
  order_id: string;
  status: boolean;
  url: string;
}

export interface TreeOccasionType {
  id: string;
  name: string;
}

export type FileStatus = {
  id: string;
  name: string;
  file: File;
  status: "uploaded" | "uploading";
};

export interface Province {
  id: string;
  name: string;
  longtitud: string;
  latitud: string;
}

export interface City {
  id: string;
  name: string;
  province_name: string;
}

export interface ProvinceData {
  province: Province;
  cities: City[];
  empty: ProvinceMarker[];
  em_count: number;
  empty_tree_allowed: number;
  searched_province: Province;
}

export interface ProvinceMarker {
  id: string;
  is_full: boolean;
  latitud: string;
  longtitud: string;
  province_name: string;
  city_name: string;
}
