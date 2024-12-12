"use client";

import { FC, useEffect, useState } from "react";

import { Session } from "next-auth";
import { redirect } from "next/navigation";
import axios from "axios";
import { FaFlag } from "react-icons/fa";
import PlantTreeMapSection from "./plantTreeMapSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { Loader2Icon } from "lucide-react";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { City, ProvinceData } from "@/types/complete-info";
import { useRouter } from "next/navigation";

const DynamicMarkerList = dynamic(() => import("./MarkerList"), {
  ssr: false,
  loading: () => (
    <div className="h-10 flex justify-center items-center">
      <Loader2Icon className="animate-spin h-9 w-9" />
    </div>
  ),
});

interface SelectAddressProps {
  session: Session | null;
}
export const provincesList = [
  {
    id: "1",
    name: "فارس",
  },
  {
    id: "2",
    name: "تهران",
  },
  {
    id: "3",
    name: "بندرعباس",
  },
  {
    id: "4",
    name: "یزد",
  },
  {
    id: "5",
    name: "بوشهر",
  },
  {
    id: "6",
    name: "کردستان",
  },
  {
    id: "7",
    name: "کرج",
  },
  {
    id: "8",
    name: "ایلام",
  },
  {
    id: "9",
    name: "لرستان",
  },
  {
    id: "0",
    name: "اصفهان",
  },
];

const SelectAddress: FC<SelectAddressProps> = ({ session }) => {
  const { setProvinceId, setCityId, selectedMarkers } =
    useCompleteInfoContext();
  const [provinceName, setProvinceName] = useState("تهران");
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState<ProvinceData | null>(null);
  const [mapProvince, setMapProvince] = useState("");

  const router = useRouter();

  const handleIndividualCustomer = () => {
    if (!data) {
      toast.error("لطفا صفحه را رفرش کنید تا استان و شهر");
      return;
    }
    if (!cityName) {
      toast.error("لطفا شهر خود را وارد کنید");
      return;
    }
    if (!provinceName) {
      toast.error("لطفا استان خود را وارد کنید");
      return;
    }
    if (selectedMarkers.length < 1) {
      toast.error("لطفا به تعداد درختان مکان انتخاب کنید");
      return;
    }
    router.push("film-and-description");
  };
  useEffect(() => {
    if (!session) {
      redirect("/");
    }

    const fetchCityAndDistrict = async () => {
      try {
        const response = await axios.get<ProvinceData>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/secondData/`,
          {
            params: {
              province: provinceName === "" ? "شهریار" : provinceName,
              map_province: mapProvince === "" ? "" : mapProvince,
            },
            headers: {
              Authorization: session.access ? `Bearer ${session.access}` : "",
              TOKEN: session.token || "",
            },
          }
        );

        if (response.status === 404) {
          toast.error("منطقه مورد نظر یافت نشد");
          return;
        }
        setData(response.data);

        if (response?.data?.province?.id) {
          setProvinceId(response.data.province.id);
        }

        if (cityName === "") {
          setCityName(response?.data?.cities[0]?.name);
        }
        // Map over the cities to get the cityId
        const selectedCity = response?.data?.cities?.find(
          (city) => city.name === cityName
        );
        if (selectedCity) {
          setCityId(selectedCity.id);
        }
      } catch (error: any) {
        console.error("Error fetching city and district:", error);

        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 404) {
            toast.error("منطقه مورد نظر یافت نشد");
          } else {
            toast.error("خطا در بارگذاری اطلاعات");
          }
        } else {
          toast.error("خطای غیرمنتظره‌ای رخ داد");
        }

        // Set fallback data regardless of error type
        setData({
          province: { id: "", name: "", longtitud: "", latitud: "" },
          cities: [],
          empty: [],
          em_count: 0,
          empty_tree_allowed: 0,
          searched_province: { id: "", name: "", longtitud: "", latitud: "" },
        });
      }
    };

    fetchCityAndDistrict();
  }, [provinceName, session, mapProvince, cityName]);

  return (
    <div className="mx-4 sm:mx-24" dir="rtl">
      <h2 className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-4">
        <FaFlag className="text-[#5F6368]" /> <span>انتخاب شهر و استان</span>
      </h2>
      <div className="flex gap-3">
        <div>
          <label htmlFor="province">استان</label>
          <select
            id="province"
            value={provinceName}
            onChange={(e) => [setProvinceName(e.target.value), setCityName("")]}
            className="flex items-center cursor-pointer px-1.5 text-sm mt-3 py-1 border-2 border-[#A3A3A3] rounded"
          >
            {provincesList?.map((province) => (
              <option key={province.id} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city">شهر</label>
          <select
            id="city"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="flex items-center cursor-pointer px-1.5 text-sm mt-3 py-1 border-2 border-[#A3A3A3] rounded"
          >
            {data?.cities?.map((city: City) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-sm mt-4 text-[#28D16C]">
        {data?.em_count} جای خالی وجود دارد
      </div>
      <div className="text-sm mt-3 text-[#1f1f1f]">
        لطفا مکانی که در آن سکونت دارید را انتخاب کنید
      </div>
      <div className="border-b-2 border-[#A3A3A3] my-8"></div>

      <PlantTreeMapSection
        session={session}
        data={data}
        mapProvince={mapProvince}
        setMapProvince={setMapProvince}
      />

      <DynamicMarkerList data={data} session={session} />

      <div className="flex justify-end gap-4">
        <div className="flex justify-end mt-8">
          <Link href={"buyer-info"}>
            <Button
              className="md:w-44 bg-[#E4E4E4] text-[#3D3D3D]"
              variant={"green"}
              size={"resizble"}
            >
              <CaretRightIcon className="h-8 w-8 text-[#3D3D3D]" />
              مرحله قبل
            </Button>
          </Link>
        </div>
        <div className="flex justify-end mt-8">
         
            <Button
              onClick={handleIndividualCustomer}
              className="md:w-44"
              variant={"green"}
              size={"resizble"}
            >
              مرحله بعد
              <CaretLeftIcon className="h-8 w-8" />
            </Button>
         
        </div>
      </div>
      <br />
    </div>
  );
};

export default SelectAddress;
