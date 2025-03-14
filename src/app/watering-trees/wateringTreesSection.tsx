"use client";

import { FallbackImage } from "@/components/products/product/headerImages";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
const DynamicModalMap = dynamic(() => import("../dashboard/trees/modalMap"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <Loader2Icon className="animate-spin text-[#28D16C] h-12 w-12" />
    </div>
  ),
});

interface WateringTreesSectionProps {
  isWaitingData: boolean;
  data: never[];
}

const WateringTreesSection: FC<WateringTreesSectionProps> = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [openMapModal, setOpenMapModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenMapModal(false);
      }
    };

    if (openMapModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMapModal]);

  return (
    <>
      <div className="mb-2 p-3 rounded-md bg-[#FFFFFF] flex flex-col md:flex-row  md:justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full md:w-auto items-center">
          <div className=" flex">
            <div className="relative w-[148px] h-[100px]  border-2 rounded-lg border-[#D2D2D2]">
              <div className=" w-full h-full">{FallbackImage()}</div>
            </div>
          </div>
          <div>
            <div>
              <span>نهال درخت </span>{" "}
              <span className="text-[#247C48] underline text-xs">
                <Link href={`/products/`}>مشاهده محصول</Link>
              </span>
            </div>
            <div className="text-sm text-center mt-2 sm:text-start">
              کد محصول:
            </div>
            <div className="text-xs flex items-center">
              <div>
                <div className="relative border-b-2 border-[#5F6368] h-5 w-4 p-1 justify-center flex ml-2 bg-white">
                  <Image
                    src={"/svgs/siteMapPin.svg"}
                    className="p-[2px]"
                    fill
                    alt="map pin"
                  />
                </div>
              </div>
              <div className="leading-7">
                {/* آدرس: {item.province_name} {item.city_name} {item.location_name}{" "} */}
                <button
                  onClick={() => setOpenMapModal(true)}
                  className=""
                >
                  <span className="font-semibold underline text-[#3F3F3F]">
                    نمایش روی نقشه
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 md:mt-0">
          <Button
            disabled={
              false
              //   loading || requestStatus.requestSend || !item.button_status
            }
            // onClick={() => handleStatusRequest(item.id)}
            className=""
            variant={"green"}
          >
            {/* {requestStatus.requestSend
              ? "درخواست شما ارسال شد"
              : item.button_status
              ? "درخواست ارسال وضعیت"
              : `${extractTimeComponent(
                  item.allowed_to_ask_for_status.toString()
                )} تا ارسال مجدد درخواست`} */}
            درخواست شما ارسال شد
          </Button>
          <Button className="border-[2px]" variant={"outline"}>
            نمایش پیام
          </Button>
        </div>
      </div>
      {openMapModal && (
        <div className="w-full bg-[#56565656] h-full z-[50] absolute top-0 right-0 flex justify-center items-center">
          <div className="w-full px-8" ref={modalRef}>
            <DynamicModalMap
              mapCenter={[parseFloat("5.3443"), parseFloat("5.3443")]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WateringTreesSection;
