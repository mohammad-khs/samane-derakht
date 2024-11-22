import { FC } from "react";
import ProgressBar from "../progressBar";
import SelectAddress from "./selectAddress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

interface CityAndDistrictProps {}

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

const CityAndDistrict: FC<CityAndDistrictProps> = async () => {
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/");
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5">
          <ProgressBar step="2" />
        </div>
      </div>
      <SelectAddress session={session} />
    </>
  );
};

export default CityAndDistrict;
