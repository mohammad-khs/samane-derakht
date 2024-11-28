"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCompleteInfoContext } from "@/context/completeInfo";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaCreditCard, FaPercent, FaWallet } from "react-icons/fa";

interface RightsidePaymentProps {
  session: Session;
}

const RightsidePayment: FC<RightsidePaymentProps> = ({ session }) => {
  const { method, setMethod, authority, setAuthority } =
    useCompleteInfoContext();
  const [loading, setLoading] = useState(false);
  const [copon, setCopon] = useState("");
  const [coponResponse, setCoponResponse] = useState();

  const handleAddCopon = async () => {
    if (!copon) {
      toast.error("لطفا کد تخفیف را وارد کنید");
      return;
    }
    if (!authority?.order_id) {
      toast.error("ID سفارش در دسترس نیست لطفا مجددا تلاش فرمایید", {
        style: { direction: "rtl" },
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/addCopon/${authority?.order_id}/`,
        { copon },
        {
          headers: {
            Authorization: session.access ? `Bearer ${session.access}` : "",
            TOKEN: session.token || "",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        setCoponResponse(response.data);
        toast.success("کد تخفیف با موفقیت ثبت گردید");
        setCopon("");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.detail === "copon is not valid" ||
          error.response?.data.detail === "No Copon matches the given query."
        ) {
          console.log(error.response?.data.detail);

          toast.error("کد تخفیف صحیح نمیباشد");
        } else if (
          error.response?.data.detail === "No Order matches the given query."
        ) {
          toast.error("No Order matches the given query.");
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
      <section dir="rtl" className="text-[#1F1F1F]">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="flex text-xl gap-3 items-center">
              <FaCreditCard className={"text-[#5F6368]"} />
              <span className="text-[#1F1F1F]">انتخاب نوع پرداخت</span>
            </h2>
            <div className="ms:mx-10 md:mx-20 mt-10 flex flex-col gap-2">
              {/* gateway Payment Button */}
              <Button
                className="w-full whitespace-normal p-5 h-auto justify-between"
                size={"lg"}
                variant={method === "gateway" ? "approved" : "lightGray"}
                onClick={() => setMethod("gateway")}
              >
                <div className="flex items-center gap-3">
                  <FaCreditCard
                    className={`w-5 h-5 ${
                      method === "gateway" ? "text-[#28D16C]" : "text-[#898989]"
                    }`}
                  />
                  <div>
                    <h3 className="text-lg text-right text-[#1F1F1F]">
                      پرداخت اینترنتی
                    </h3>
                    <div className="text-[#898989] text-xs text-start">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </div>
                  </div>
                </div>
                {method === "gateway" && (
                  <div className="hidden sm:flex justify-center items-center rounded-full border-2 border-[#28D16C]">
                    <FaCheck className="w-4 h-4 m-1 text-[#28D16C]" />
                  </div>
                )}
              </Button>

              {/* Wallet Payment Button */}
              <Button
                className="w-full whitespace-normal p-5 h-auto justify-between"
                size={"lg"}
                variant={method === "wallet" ? "approved" : "lightGray"}
                onClick={() => setMethod("wallet")}
              >
                <div className="flex items-center gap-3">
                  <FaWallet
                    className={`w-5 h-5 ${
                      method === "wallet" ? "text-[#28D16C]" : "text-[#898989]"
                    }`}
                  />
                  <div>
                    <h3 className="text-lg text-right text-[#1F1F1F]">
                      پرداخت با کیف پول
                    </h3>
                    <span className="text-[#898989] text-xs">
                      موجودی کیف پول:{" "}
                      <span className="text-[#383838]">2,400,000</span> تومان
                    </span>
                  </div>
                </div>
                {method === "wallet" && (
                  <div className="hidden sm:flex justify-center items-center rounded-full border-2 border-[#28D16C]">
                    <FaCheck className="w-4 h-4 m-1 text-[#28D16C]" />
                  </div>
                )}
              </Button>
            </div>
          </div>
          <div>
            <h2 className="flex text-xl gap-3 items-center">
              <FaPercent className={"text-[#5F6368]"} />
              <span className="text-[#1F1F1F]">استفاده از کد تخفیف</span>
            </h2>
            <div className="ms:mx-10 md:mx-20 mt-10 flex flex-col gap-2">
              <h3 className="">کد تخفیف را وارد نمایید</h3>
              <div className="flex  items-center gap-5">
                <Input
                  placeholder="کد تخفیف"
                  value={copon}
                  onChange={(e) => setCopon(e.target.value)}
                  className="md:w-72"
                />

                <Button
                  disabled={loading}
                  onClick={handleAddCopon}
                  className="bg-[#E4E4E4] hover:bg-[#D2D2D2]"
                  variant={"outline"}
                >
                  {loading ? (
                    <div className="flex w-16 md:w-full justify-center items-center">
                      <Loader2 className="animate-spin  text-[#5F6368]" />
                    </div>
                  ) : (
                    <span>بررسی کد</span>
                  )}
                </Button>
              </div>
              {coponResponse && (
                <div className="flex items-center gap-5">
                  <div className="p-1 rounded-md bg-[#28D16C33]">
                    <FaCheck className="text-[#247C48]" />
                  </div>
                  <p className="text-xs md:text-sm leading-6">
                    شما 200 هزار تومان تخفیف دریافت کرده اید
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RightsidePayment;
