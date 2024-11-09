"use client"
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import axios from "axios";
import { Session } from "next-auth";
import { FC, useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
interface LeftSideShoppingCartProps {
  allPrice: {
    all_price: number;
  };
  allPriceWithOff: {
    all_price_off: number;
  };
  session: Session | null;
}

const LeftSideShoppingCart: FC<LeftSideShoppingCartProps> = ({
  allPrice,
  allPriceWithOff,
  session,
}) => {
  const [totalCount, setTotalCount] = useState<any>();
  useEffect(() => {
    const fetchTotal = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/api/cartcount/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: session?.access ? `Bearer ${session.access}` : "",
            TOKEN: session?.token ?? "",
          },
        }
      );
      setTotalCount(response.data);
    };
    fetchTotal();
  }, [allPrice]);

  return (
    <>
      <div className="rounded-lg bg-white p-4">
        <div
          className="flex justify-between items-center mb-3 gap-5"
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-col">
            <h3 className="text-sm">مجموع کالا ها:</h3>
            <div className="text-xs text-[#9F9F9F]">
              {totalCount?.count} کالا{" "}
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            {formatNumberWithCommas(allPrice?.all_price)}
            <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
          </div>
        </div>
        <div
          className="flex justify-between items-center"
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-col">
            <h3 className="text-sm">تخفیف:</h3>
          </div>
          <div className="flex justify-center items-center gap-1">
            {formatNumberWithCommas(
              allPrice?.all_price - allPriceWithOff?.all_price_off
            )}
            <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
          </div>
        </div>
        <div className="my-3 border-b-2 border-b-[#E4E4E4]"></div>
        <div
          className="flex justify-between items-center"
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-col">
            <h3 className="font-semibold">مبلغ نهایی:</h3>
          </div>
          <div className="flex justify-center items-center gap-1">
            {formatNumberWithCommas(allPriceWithOff?.all_price_off)}
            <span className="text-[#28D16C] text-xs">تومان</span>{" "}
          </div>
        </div>
        <Button className="w-full my-3" variant={"green"} size={"default"}>
          تایید فاکتور و پرداخت
        </Button>
        <div
          className="flex gap-2 text-sm  items-center"
          style={{ direction: "rtl" }}
        >
          <FaTruck className="text-[#5F6368]" />
          <span className="text-xs">
            زمان کاشت درخت 7 تا 10 روز کاری میباشد
          </span>
        </div>
      </div>
    </>
  );
};

export default LeftSideShoppingCart;
