"use client";
import { Button } from "@/components/ui/button";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTelegram, FaTruck } from "react-icons/fa";

interface LeftsidePaymentProps {
  session: Session;
}

const LeftsidePayment: FC<LeftsidePaymentProps> = ({ session }) => {
  const { authority, method } = useCompleteInfoContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("this is authority : ", authority);

  console.log(authority?.all_price);
  console.log(authority?.all_price_with_off);

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
        console.log("this is data: ", response.data);
        router.replace(`${response.data.authority}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error.message = "not enough balance")) {
          toast.error("موجودی شما کافی نمی باشد");
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
            <h3 className="font-semibold text-lg">مجموع کالا ها:</h3>
            <div className="text-xs text-[#9F9F9F]">
              {authority?.products_count}
              کالا{" "}
            </div>
          </div>
          <div className="flex justify-center items-center gap-1 font-semibold text-lg">
            {authority?.all_price
              ? formatNumberWithCommas(authority.all_price)
              : 0}
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
            {authority?.all_price_with_off
              ? formatNumberWithCommas(
                  authority.all_price - authority.all_price_with_off
                )
              : 0}
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
                  (authority.has_video ? authority.video_price : 0) +
                    (authority.has_voice ? authority.voice_price : 0) +
                    (authority.images ? authority.image_price : 0)
                )}
                <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {/* <div className="text-xs text-[#737373] my-3">
          {authority?.has_video && (
            <div
              className="flex justify-between items-center"
              style={{ direction: "rtl" }}
            >
              <div className="flex flex-col">
                <h3>هزینه ضبط فیلم:</h3>
              </div>
              <div className="flex justify-center items-center gap-1">
                {formatNumberWithCommas(authority?.video_price)}
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
                {formatNumberWithCommas(authority.image_price)}
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
                {formatNumberWithCommas(authority.voice_price)}
                <span className="text-[#9F9F9F] text-xs">تومان</span>{" "}
              </div>
            </div>
          )}
        </div> */}

        <div className="my-3 border-b-2 border-b-[#E4E4E4]"></div>
        <div
          className="flex justify-between items-center"
          style={{ direction: "rtl" }}
        >
          <div className="flex flex-col">
            <h3 className="font-semibold">مبلغ نهایی:</h3>
          </div>
          <div className="flex justify-center items-center gap-1 font-semibold text-lg">
            {authority?.all_price && authority.all_price_with_off
              ? formatNumberWithCommas(authority.all_price_with_off)
              : 0}
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
      <section className="rounded-lg bg-white p-4 mt-3">
        <h3 className="text-sm font-semibold mb-3">
          برای آپلود فایل‌های بیش از حد مجاز سایت، متن زیر را کپی کرده و با
          لینک‌های زیر به پیام‌رسان دلخواه ارسال کنید
        </h3>
        <div
          className="flex items-center gap-2 bg-gray-100 p-2 rounded-md group hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={() => {
            if (authority?.order_id) {
              navigator.clipboard.writeText(authority.order_id);
              toast.success("کد سفارش کپی شد");
            }
          }}
          title="برای کپی کلیک کنید"
        >
          <div className="font-mono text-xs text-gray-800 select-all flex-1">
            {authority?.order_id ?? "null"}
          </div>
          <div className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            کپی
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <a
            href="https://web.bale.ai/chat?uid=70367646"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700"
          >
            <div className="w-8 h-8 rounded-full bg-[#00b894]">
              <FaCheck className="rounded-full font-semibold text-white p-1 w-8 h-8" />
            </div>
          </a>
          <a
            href="https://t.me/mohammad_khsv"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <div className="text-[#0088cc]  cursor-pointer w-8 h-8">
              <FaTelegram className=" w-8 h-8" />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default LeftsidePayment;
