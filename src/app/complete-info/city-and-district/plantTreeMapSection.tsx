"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import PlantTreeMap from "./plantTreeMap";
import { ProvinceData } from "./page";
import dynamic from "next/dynamic";
import { Loader2Icon } from "lucide-react";

const DynamicPlantTreeMap = dynamic(() => import("./plantTreeMap"), {
  ssr: false,
  loading: () => (
    <div className="h-72 flex justify-center items-center">
      <Loader2Icon className="animate-spin h-9 w-9" />
    </div>
  ),
});

interface PlantTreeMapSectionProps {
  mapProvince: string;
  data: ProvinceData | null;

  setMapProvince: Dispatch<SetStateAction<string>>;
}

const PlantTreeMapSection: FC<PlantTreeMapSectionProps> = ({
  data,
  setMapProvince,
}) => {
  console.log(data);

  const [temp, setTemp] = useState("");
  return (
    <>
      <div className="mb-8">
        <h2 className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-4">
          <div className="relative h-6 w-6 p-1 rounded-md justify-center flex ml-2 bg-white">
            <Image
              src={"/svgs/siteMapPin.svg"}
              className="p-[2px]"
              fill
              alt="map pin"
            />
            <div className="w-full border-b-[3px] mt-5 border-b-[#5F6368]"></div>
          </div>
          <span>انتخاب شهر و استان</span>
        </h2>
        <p className="text-[#373737] text-sm mb-8">
          منطقه مورد نظر خودت رو وارد کن
        </p>
        <div className="relative w-full sm:w-3/5 lg:w-2/5 my-4">
          <Input
            className="h-10 lg:h-12 outline-none border-2 border-[#5F6368] lg:py-3 px-4 w-full placeholder:text-[#5f5f5f] bg-transparent rounded-lg"
            type="text"
            value={temp}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setMapProvince(temp);
              }
            }}
            onChange={(e) => setTemp(e.target.value)}
            dir="rtl"
            placeholder="تهران، بلوار ستارخان"
          />
          <div className="absolute top-1 left-1">
            <Button
              onClick={() => setMapProvince(temp)}
              className=" flex justify-center items-center gap-1 bg-[#28D16C] hover:bg-[#28D16C] rounded-lg text-white"
              size={"resizble"}
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>جستجو </span>
            </Button>
          </div>
        </div>

        <div className="w-full border-2 p-3 rounded-[40px]">
          <DynamicPlantTreeMap
            searchedProvince={data?.searched_province}
            mapMarkerData={data?.empty}
          />
        </div>
        <p className="text-[#373737] text-sm mr-2 mt-5">
          تعداد {data?.em_count} درخت در منطقه انتخاب شده آزاد است.
        </p>
      </div>
    </>
  );
};

export default PlantTreeMapSection;
