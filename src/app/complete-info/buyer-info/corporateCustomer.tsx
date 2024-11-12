import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import { FaBuilding, FaPhoneAlt } from "react-icons/fa";

interface CorporateCustomerProps {
  setIsIndividual: Dispatch<SetStateAction<boolean>>;
}

const CorporateCustomer: FC<CorporateCustomerProps> = ({ setIsIndividual }) => {
  return (
    <>
      <div className=" mx-4 sm:mx-24" dir="rtl">
        <div className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-4">
          <FaBuilding /> <span>مشخصات شرکت </span>
        </div>
        <label className="text-sm text-[#1F1F1F]" htmlFor="factory-name">
          نام سازمان
        </label>
        <div>
          <Input
            className="my-3"
            id="factory-name"
            type="text"
            variant="default"
            size="default"
            placeholder="نام خود را وارد نمایید"
          />
        </div>
        <label className="text-sm text-[#1F1F1F]" htmlFor="registration-number">
          شناسه ثبت
        </label>
        <div>
          <Input
            className="my-3"
            id="registration-number"
            type="text"
            variant="default"
            size="default"
            placeholder="نام خود را وارد نمایید"
          />
        </div>

        <div className="border-b-2 border-[#A3A3A3] my-8"></div>
        <div className="flex items-center gap-4 text-[#1F1F1F] font-semibold text-lg leading-6 mt-8 mb-4">
          <FaPhoneAlt className="text-[#5F6368]" /> <span>اطلاعات تماس</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-8">
          <div>
            <label className="text-sm text-[#1F1F1F]" htmlFor="corporate-email">
              ایمیل
            </label>
            <div>
              <Input
                className="my-3"
                id="corporate-email"
                type="email"
                variant="default"
                size="default"
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
          </div>
          <div>
            <label
              className="text-sm text-[#1F1F1F]"
              htmlFor="corporate-phone2"
            >
              شماره تماس دوم
            </label>
            <div>
              <Input
                className="my-3"
                id="corporate-phone2"
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
          </div>
        </div>
        <div className="mt-8 text-sm">
          آیا شما یک شخص حقیقی هستید ؟{" "}
          <button onClick={() => setIsIndividual(true)}>
            <span className="text-[#0B50AA] underline">وارد کردن اطلاعات</span>{" "}
          </button>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Link href={"city-and-district"}>
            <Button className="md:w-44" variant={"green"} size={"resizble"}>
              مرحله بعد
              <CaretLeftIcon className="h-8 w-8" />
            </Button>
          </Link>
        </div>
        <br />
      </div>
    </>
  );
};

export default CorporateCustomer;
