"use client";
import { FallbackImage } from "@/components/products/product/headerImages";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MyTreeItem } from "./myTrees";

interface MyTreesSectionProps {
  item: MyTreeItem;
}

const MyTreesSection: FC<MyTreesSectionProps> = ({ item }) => {
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
                <Link href={`/products/${item?.tree_name}`}>مشاهده محصول</Link>
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
                <span className="font-semibold underline text-[#3F3F3F]">نمایش روی مپ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 md:mt-0">
          <Button className="" variant={"green"}>
            درخواست ارسال وضعیت
          </Button>
          <Button className="border-[2px]" variant={"outline"}>
            نمایش پیام
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyTreesSection;
