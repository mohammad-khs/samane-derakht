import { ProvinceData } from "@/types/complete-info";

export const mockCompleteInfoSecondData: ProvinceData = {
  province: {
    id: "2",
    name: "تهران",
    longtitud: "51.3890",
    latitud: "35.7447",
  },
  cities: [
    { id: "city-1", name: "تهران", province_name: "تهران" },
    { id: "city-2", name: "شهریار", province_name: "تهران" },
    { id: "city-3", name: "ری", province_name: "تهران" },
    { id: "city-4", name: "قرچک", province_name: "تهران" },
    { id: "city-5", name: "اسلامشهر", province_name: "تهران" },
  ],
  empty: [
    {
      id: "marker-1",
      is_full: false,
      latitud: "35.7447",
      longtitud: "51.3890",
      province_name: "تهران",
      city_name: "تهران",
    },
    {
      id: "marker-2",
      is_full: false,
      latitud: "35.7500",
      longtitud: "51.4000",
      province_name: "تهران",
      city_name: "تهران",
    },
    {
      id: "marker-3",
      is_full: true,
      latitud: "35.7600",
      longtitud: "51.4100",
      province_name: "تهران",
      city_name: "تهران",
    },
    {
      id: "marker-4",
      is_full: false,
      latitud: "35.7300",
      longtitud: "51.3700",
      province_name: "تهران",
      city_name: "تهران",
    },
    {
      id: "marker-5",
      is_full: false,
      latitud: "35.7700",
      longtitud: "51.4200",
      province_name: "تهران",
      city_name: "تهران",
    },
  ],
  em_count: 5,
  empty_tree_allowed: 3,
  searched_province: {
    id: "2",
    name: "تهران",
    longtitud: "51.3890",
    latitud: "35.7447",
  },
};