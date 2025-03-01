"use client";

import { FallbackImage } from "@/components/products/product/headerImages";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { MyTreeItem } from "./myTrees";
import dynamic from "next/dynamic";
import { Loader2Icon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { Session } from "next-auth";

const DynamicModalMap = dynamic(() => import("./modalMap"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <Loader2Icon className="animate-spin text-[#28D16C] h-12 w-12" />
    </div>
  ),
});

interface MyTreesSectionProps {
  item: MyTreeItem;
  session: Session;
}

function extractTimeComponent(timeString: string): string {
  // Split the days and time parts
  const [daysPart, timePart] = timeString
    .split(", ")
    .map((part) => part.trim());

  // Extract the number of days
  const days = parseInt(daysPart.split(" ")[0], 10);

  if (days >= 1) {
    return `${days} روز`;
  }

  // Extract hours from the time part if days < 1
  const [hours] = timePart.split(":").map(Number);
  return `${hours} ساعت`;
}

const MyTreesSection: FC<MyTreesSectionProps> = ({ item, session }) => {
  const [openMapModal, setOpenMapModal] = useState(false);
  const [requestStatus, setRequestStatues] = useState({ requestSend: false });
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleStatusRequest = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/request-status/${id}/`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      console.log("this is resp of fav delete : ", response.data);

      if (response.status === 200) {
        console.log("this is delete favorite", response.data);
        setRequestStatues(response.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError<string[]>; // Proper typing
      if (axiosError.response?.data?.[0]?.includes("user has not permission")) {
        setRequestStatues({ requestSend: true });
      }

      console.error("Error fetching favorite:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div
        key={item.id}
        className="mb-2 p-3 rounded-md bg-[#FFFFFF] flex flex-col md:flex-row  md:justify-between items-center"
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full md:w-auto items-center">
          <div className=" flex">
            <div className="relative w-[148px] h-[100px]  border-2 rounded-lg border-[#D2D2D2]">
              {item.tree_type_image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.tree_type_image}`}
                  alt={`عکس درخت ${item.tree_type_image}`}
                  fill
                  className="rounded-lg"
                />
              ) : (
                <div className=" w-full h-full">{FallbackImage()}</div>
              )}
            </div>
          </div>
          <div>
            <div>
              <span>نهال درخت {item.tree_name}</span>{" "}
              <span className="text-[#247C48] underline text-xs">
                <Link href={`/products/${item?.tree_type_slug}`}>
                  مشاهده محصول
                </Link>
              </span>
            </div>
            <div className="text-sm text-center mt-2 sm:text-start">
              کد محصول: {item.order_custom_id}
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
                آدرس: {item.province_name} {item.city_name} {item.location_name}{" "}
                <button onClick={() => setOpenMapModal(true)} className="">
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
              loading || requestStatus.requestSend || !item.button_status
            }
            onClick={() => handleStatusRequest(item.id)}
            className=""
            variant={"green"}
          >
            {requestStatus.requestSend
              ? "درخواست شما ارسال شد"
              : item.button_status
              ? "درخواست ارسال وضعیت"
              : `${extractTimeComponent(
                  item.allowed_to_ask_for_status.toString()
                )} تا ارسال مجدد درخواست`}
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
              mapCenter={[parseFloat(item.latitud), parseFloat(item.longtitud)]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MyTreesSection;
