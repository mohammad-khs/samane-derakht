"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { FaCheck, FaCreditCard, FaPercent, FaWallet } from "react-icons/fa";

interface RightsidePaymentProps {}

const RightsidePayment: FC<RightsidePaymentProps> = () => {
  const [activeButton, setActiveButton] = useState<"internet" | "wallet">(
    "internet"
  );
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
              {/* Internet Payment Button */}
              <Button
                className="w-full whitespace-normal p-5 h-auto justify-between"
                size={"lg"}
                variant={activeButton === "internet" ? "approved" : "lightGray"}
                onClick={() => setActiveButton("internet")}
              >
                <div className="flex items-center gap-3">
                  <FaCreditCard
                    className={`w-5 h-5 ${
                      activeButton === "internet"
                        ? "text-[#28D16C]"
                        : "text-[#898989]"
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
                {activeButton === "internet" && (
                  <div className="hidden sm:flex justify-center items-center rounded-full border-2 border-[#28D16C]">
                    <FaCheck className="w-4 h-4 m-1 text-[#28D16C]" />
                  </div>
                )}
              </Button>

              {/* Wallet Payment Button */}
              <Button
                className="w-full whitespace-normal p-5 h-auto justify-between"
                size={"lg"}
                variant={activeButton === "wallet" ? "approved" : "lightGray"}
                onClick={() => setActiveButton("wallet")}
              >
                <div className="flex items-center gap-3">
                  <FaWallet
                    className={`w-5 h-5 ${
                      activeButton === "wallet"
                        ? "text-[#28D16C]"
                        : "text-[#898989]"
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
                {activeButton === "wallet" && (
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
                <Input placeholder="کد تخفیف" className="md:w-72" />

                <Button
                  className="bg-[#E4E4E4] hover:bg-[#D2D2D2]"
                  variant={"outline"}
                >
                  بررسی کد
                </Button>
              </div>
              <div className="flex items-center gap-5">
                <div className="p-1 rounded-md bg-[#28D16C33]">
                  <FaCheck className="text-[#247C48]" />
                </div>
                <p className="text-xs md:text-sm leading-6">
                  شما 200 هزار تومان تخفیف دریافت کرده اید
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RightsidePayment;
