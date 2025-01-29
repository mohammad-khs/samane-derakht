"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Dispatch, FC, SetStateAction } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { TreeUserIcon } from "./page";
import PersianDatePicker from "@/components/ui/persianDateInputs";
import { useCompleteInfoContext } from "@/context/completeInfo";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IndividualCustomerProps {
  setCustomer: Dispatch<SetStateAction<"HA" | "HO">>;
}

const IndividualCustomer: FC<IndividualCustomerProps> = ({ setCustomer }) => {
  const router = useRouter();
  const handleIndividualCustomer = () => {
    if (name === "") {
      toast.error("لطفا نام و نام خانوادگی خود را وارد کنید");
      return;
    }
    router.push("city-and-district");
  };
  const { email, setEmail, name, setName } = useCompleteInfoContext();
  return (
    <>
      <div className=" mx-4 sm:mx-24" dir="rtl">
        <div className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-4">
          <TreeUserIcon /> <span>مشخصات کاربری </span>
        </div>
        <label className="text-sm text-[#1F1F1F]" htmlFor="name">
          نام و نام خانوادگی
        </label>
        <div>
          <Input
            className="my-3"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            variant="default"
            size="default"
            placeholder="نام خود را وارد نمایید"
          />
        </div>
        <label className="text-sm text-[#1F1F1F]" htmlFor="birthday">
          تاریخ تولد
        </label>
        <div className="my-3">
          <PersianDatePicker />
        </div>
        <div className="border-b-2 border-[#A3A3A3] my-8"></div>
        <div className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-4">
          <FaPhoneAlt className="text-[#5F6368]" /> <span>اطلاعات تماس</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-8">
          <div>
            <label className="text-sm text-[#1F1F1F]" htmlFor="email">
              ایمیل
            </label>
            <div>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="my-3"
                id="email"
                type="email"
                variant="default"
                size="default"
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
          </div>
          {/* <div>
            <label className="text-sm text-[#1F1F1F]" htmlFor="phone2">
              شماره تماس دوم
            </label>
            <div>
              <Input
                className="my-3"
                id="phone2"
                type="text"
                variant="default"
                size="default"
                placeholder="شماره تماس"
              />
            </div>
            <p className="text-[#565656] text-xs">
              <sup>*</sup>در صورت جواب ندادن شماره خودتان، با این شماره تماس
              گرفته خواهد شد
            </p>
          </div> */}
        </div>
        <div className="mt-8 text-sm">
          آیا شما یک شخص حقوقی هستید ؟{" "}
          <button onClick={() => setCustomer("HO")}>
            <span className="text-[#0B50AA] underline">وارد کردن اطلاعات</span>{" "}
          </button>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button
            onClick={handleIndividualCustomer}
            className="md:w-44"
            variant={"green"}
            size={"resizble"}
          >
            مرحله بعد
            <CaretLeftIcon className="h-8 w-8" />
          </Button>
        </div>
        <br />
      </div>
    </>
  );
};

export default IndividualCustomer;
