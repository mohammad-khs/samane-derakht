"use client";
import { Button } from "@/components/ui/button";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { FaTruck } from "react-icons/fa";

interface LeftsidePaymentProps {
  session: Session;
}

const LeftsidePayment: FC<LeftsidePaymentProps> = ({ session }) => {
  const { authority, method } = useCompleteInfoContext();
  const [loading, setLoading] = useState(false);
  const [authorityCode, setAuthorityCode] = useState("");
  const router = useRouter();
  const handlePayOrder = async () => {
    if (!authority?.order_id) {
      toast.error("ID سفارش در دسترس نیست لطفا مجددا تلاش فرمایید", {
        style: { direction: "rtl" },
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/payOrder/${authority?.order_id}/?method=${method}`,
        {
          headers: {
            Authorization: session.access ? `Bearer ${session.access}` : "",
            TOKEN: session.token || "",
          },
        }
      );
      if (response.status === 200) {
        setAuthorityCode(response.data.authority);
        console.log("this is data: ", response.data);
        window.open(
          `https://sandbox.zarinpal.com/pg/StartPay/${response.data.authority}`
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error.message = "not enough balance")) {
          toast.error("موجودی شما کافی نمیباشد");
        } else {
          console.error("Axios error:", error.response?.data || error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

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
        {authority?.has_voice || authority?.has_video || authority?.images ? (
          <>
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
                  (authority.has_video ? 400000 : 0) +
                    (authority.has_voice ? 900000 : 0) +
                    (authority.images ? 900000 : 0)
                )}
                <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="text-xs text-[#737373] my-3">
          {authority?.has_video && (
            <div
              className="flex justify-between items-center"
              style={{ direction: "rtl" }}
            >
              <div className="flex flex-col">
                <h3>هزینه ضبط فیلم:</h3>
              </div>
              <div className="flex justify-center items-center gap-1">
                {formatNumberWithCommas(400000)}
                <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
              </div>
            </div>
          )}

          {authority?.images && (
            <div
              className="flex justify-between items-center"
              style={{ direction: "rtl" }}
            >
              <div className="flex flex-col">
                <h3>هزینه آپلود عکس:</h3>
              </div>
              <div className="flex justify-center items-center gap-1">
                {formatNumberWithCommas(900000)}
                <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
              </div>
            </div>
          )}

          {authority?.has_voice && (
            <div
              className="flex justify-between items-center"
              style={{ direction: "rtl" }}
            >
              <div className="flex flex-col">
                <h3>هزینه ضبط صدا:</h3>
              </div>
              <div className="flex justify-center items-center gap-1">
                {formatNumberWithCommas(900000)}
                <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
              </div>
            </div>
          )}
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

        <Button
          disabled={loading}
          onClick={handlePayOrder}
          className="w-full my-3"
          variant={"green"}
          size={"default"}
        >
          {loading ? (
            <div className="flex w-16 md:w-full justify-center items-center">
              <Loader2 className="animate-spin  text-white" />
            </div>
          ) : (
            <span>تایید فاکتور و پرداخت</span>
          )}
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
      </section>
    </>
  );
};

export default LeftsidePayment;
