import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import Link from "next/link";
import { FC } from "react";
import { FaTruck } from "react-icons/fa";

interface LeftsidePaymentProps {}

const LeftsidePayment: FC<LeftsidePaymentProps> = () => {
  return (
    <>
      <section className="rounded-lg bg-white p-4 whitespace-nowrap">
        <div
          className="flex justify-between items-center mb-3 sm:gap-16"
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-col">
            <h3 className="text-sm">مجموع کالا ها:</h3>
            <div className="text-xs text-[#9F9F9F]">
              {/* {allProductsCount} */}
              کالا{" "}
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            {/* {formatNumberWithCommas(allPrice?.all_price)} */}
            2,000,000
            <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
          </div>
        </div>

        <div className="my-3 border-b-2 border-b-[#E4E4E4]"></div>

        <div
          className="flex justify-between items-center"
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-col">
            <h3 className="text-sm">تخفیف:</h3>
          </div>
          <div className="flex justify-center items-center gap-1">
            {formatNumberWithCommas(
              //   allPrice?.all_price - allPriceWithOff?.all_price_off
              100000
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
            <h3 className="text-sm">هزینه فیلم و عکس:</h3>
          </div>
          <div className="flex justify-center items-center gap-1">
            {formatNumberWithCommas(
              //   allPrice?.all_price - allPriceWithOff?.all_price_off
              900000
            )}
            <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
          </div>
        </div>
        <div className="text-xs text-[#737373] my-3">
          <div
            className="flex justify-between items-center"
            style={{ direction: "rtl" }}
          >
            <div className="flex flex-col">
              <h3>هزینه ضبط فیلم:</h3>
            </div>
            <div className="flex justify-center items-center gap-1">
              {formatNumberWithCommas(
                //   allPrice?.all_price - allPriceWithOff?.all_price_off
                400000
              )}
              <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
            </div>
          </div>

          <div
            className="flex justify-between items-center"
            style={{ direction: "rtl" }}
          >
            <div className="flex flex-col">
              <h3>هزینه آپلود عکس:</h3>
            </div>
            <div className="flex justify-center items-center gap-1">
              {formatNumberWithCommas(
                //   allPrice?.all_price - allPriceWithOff?.all_price_off
                900000
              )}
              <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
            </div>
          </div>

          <div
            className="flex justify-between items-center"
            style={{ direction: "rtl" }}
          >
            <div className="flex flex-col">
              <h3>هزینه ضبط صدا:</h3>
            </div>
            <div className="flex justify-center items-center gap-1">
              {formatNumberWithCommas(
                //   allPrice?.all_price - allPriceWithOff?.all_price_off
                900000
              )}
              <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
            </div>
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
            {formatNumberWithCommas(
              // allPriceWithOff?.all_price_off
              1900000
            )}
            <span className="text-[#28D16C] text-xs">تومان</span>{" "}
          </div>
        </div>
        {/* <Link href={"/complete-info/buyer-info"}> */}
        <Button className="w-full my-3" variant={"green"} size={"default"}>
          تایید فاکتور و پرداخت
        </Button>
        {/* </Link> */}
        <div
          className="flex gap-2 text-sm  items-center"
          style={{ direction: "rtl" }}
        >
          <FaTruck className="text-[#5F6368]" />
          <span className="text-xs">
            زمان کاشت درخت 7 تا 10 روز کاری میباشد
          </span>
        </div>
      </section>
    </>
  );
};

export default LeftsidePayment;
