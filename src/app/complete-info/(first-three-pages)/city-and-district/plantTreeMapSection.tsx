"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2Icon } from "lucide-react";
import { Session } from "next-auth";
import { ProvinceData } from "@/types/complete-info";
import { FaExclamationCircle } from "react-icons/fa";

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
  session: Session | null;
  setMapProvince: Dispatch<SetStateAction<string>>;
}

const PlantTreeMapSection: FC<PlantTreeMapSectionProps> = ({
  data,
  session,
  setMapProvince,
}) => {
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
          لطفا اسم شهر یا استان مد نظر خود را وارد کنید <sup>*</sup>
        </p>
        <div className="relative w-full sm:w-3/5 lg:w-2/5 my-4">
          <Input
            className="h-10 lg:h-12 outline-none border-2 border-[#a3a3a3] lg:py-3 px-4 w-full placeholder:text-[#5f5f5f] bg-transparent rounded-lg"
            type="text"
            value={temp}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setMapProvince(temp);
                setTemp("");
              }
            }}
            onChange={(e) => setTemp(e.target.value)}
            dir="rtl"
            placeholder="تهران، بلوار ستارخان"
          />
          <div className="absolute top-1 left-1">
            <Button
              onClick={() => [setMapProvince(temp), setTemp("")]}
              className=" flex justify-center items-center gap-1 bg-[#28D16C] hover:bg-[#28D16C] rounded-lg text-white"
              size={"resizble"}
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>جستجو</span>
            </Button>
          </div>
        </div>
        <div className="my-4">
          <p className="text-[#373737] text-sm font-semibold mb-3  mt-5">
            تعداد {data?.em_count} درخت در منطقه انتخاب شده آزاد است.
          </p>
          <p className="text-[#373737] mb-1 text-xs flex items-center gap-2">
            <FaExclamationCircle
              className="w-[12px] h-[12px] flex-shrink-0"
              color="#373737"
            />
            توجه داشته باشید که به تعداد درخت های سبد خرید شما باید مکان انتخاب
            کنید <sup>*</sup>
          </p>
          <p className="text-[#373737] mb-1 text-xs flex items-center gap-2">
            <FaExclamationCircle
              className="w-[12px] h-[12px] flex-shrink-0"
              color="#373737"
            />
            برای تغییر مکان انتخاب شده فقط کافیست دوباره روی آن کلیک کنید{" "}
            <sup>*</sup>
          </p>
          <p className="text-[#373737] mb-1 text-xs flex items-center gap-2">
            <FaExclamationCircle
              className="w-[12px] h-[12px] flex-shrink-0"
              color="#373737"
            />
            با کلیک برروی دکمه گوشه بالا سمت راست نقشه میتوانید آن را بزرگ نمایی
            کنید <sup>*</sup>
          </p>
        </div>
        <div className="w-full border-2 p-3 rounded-[40px]">
          <DynamicPlantTreeMap
            emptyTreeAllowed={data?.empty_tree_allowed}
            session={session}
            searchedProvince={data?.searched_province}
            mapMarkerData={data?.empty}
          />
        </div>
      </div>
    </>
  );
};

export default PlantTreeMapSection;
