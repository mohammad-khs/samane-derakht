import { FC } from "react";
import {
  FaCreditCard,
  FaFlag,
  FaTree,
  FaUserAlt,
  FaCheck,
} from "react-icons/fa";

interface ProgressBarProps {
  step?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ step }) => {
  const currentStep = parseInt(step || "1");

  return (
    <div className="p-5" dir="rtl">
      <div className="text-center my-2 font-semibold text-[#1F1F1F]">
        تکمیل اطلاعات
      </div>
      <ul className="flex text-[#373737] font-semibold">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <li
            className={`${
              currentStep === 1
                ? "ring-[2px] ring-[#28D16C] bg-[#EAEAEA]"
                : currentStep > 1
                ? "bg-[#28D16C]"
                : "bg-[#EAEAEA]"
            } p-1 sm:p-3 rounded-full`}
          >
            {currentStep > 1 ? (
              <FaCheck className="m-1 w-5 h-5 text-white" />
            ) : (
              <FaUserAlt
                className={`m-1 w-5 h-5 ${
                  currentStep === 1 ? "text-[#28D16C]" : "text-[#5F6368]"
                }`}
              />
            )}
          </li>
          <div
            className={`text-xs hidden sm:block mt-2 w-24 text-center mb-auto`}
          >
            1.اطلاعات خریدار
          </div>
          {currentStep > 1 && (
            <div className="font-semibold hidden sm:block text-[#28D16C] text-[10px] bg-[#28D16C33] leading-6 px-2 mt-2 rounded-lg">
              کامل شده
            </div>
          )}
        </div>

        <div className="border-b-2 border-[#EAEAEA] w-full mx-2 self-start mt-5 sm:mt-7"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <li
            className={`${
              currentStep === 2
                ? "ring-[2px] ring-[#28D16C] bg-[#EAEAEA]"
                : currentStep > 2
                ? "bg-[#28D16C]"
                : "bg-[#EAEAEA]"
            } p-1 sm:p-3 rounded-full`}
          >
            {currentStep > 2 ? (
              <FaCheck className="m-1 w-5 h-5 text-white" />
            ) : (
              <FaFlag
                className={`m-1 w-5 h-5 ${
                  currentStep === 2 ? "text-[#28D16C]" : "text-[#5F6368]"
                }`}
              />
            )}
          </li>
          <div
            className={`text-xs hidden sm:block mt-2 w-24 text-center mb-auto`}
          >
            2.انتخاب شهر و محل
          </div>
          {currentStep > 2 && (
            <div className="font-semibold hidden sm:block text-[#28D16C] text-[10px] bg-[#28D16C33] leading-6 px-2 mt-2 rounded-lg">
              کامل شده
            </div>
          )}
        </div>

        <div className="border-b-2 border-[#EAEAEA] w-full mx-2 self-start mt-5 sm:mt-7"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <li
            className={`${
              currentStep === 3
                ? "ring-[2px] ring-[#28D16C] bg-[#EAEAEA]"
                : currentStep > 3
                ? "bg-[#28D16C]"
                : "bg-[#EAEAEA]"
            } p-1 sm:p-3 rounded-full`}
          >
            {currentStep > 3 ? (
              <FaCheck className="m-1 w-5 h-5 text-white" />
            ) : (
              <FaTree
                className={`m-1 w-5 h-5 ${
                  currentStep === 3 ? "text-[#28D16C]" : "text-[#5F6368]"
                }`}
              />
            )}
          </li>
          <div
            className={`text-xs hidden sm:block mt-2 w-24 text-center mb-auto`}
          >
            3.آپلود فیلم و توضیحات
          </div>
          {currentStep > 3 && (
            <div className="font-semibold hidden sm:block text-[#28D16C] text-[10px] bg-[#28D16C33] leading-6 px-2 mt-2 rounded-lg">
              کامل شده
            </div>
          )}
        </div>

        <div className="border-b-2 border-[#EAEAEA] w-full mx-2 self-start mt-5 sm:mt-7"></div>

        {/* Step 4 */}
        <div className="flex flex-col items-center">
          <li
            className={`${
              currentStep >= 4 ? "ring-[2px] ring-[#28D16C]" : "bg-[#EAEAEA]"
            } p-1 sm:p-3 rounded-full`}
          >
            <FaCreditCard
              className={`m-1 w-5 h-5 ${
                currentStep === 4 ? "text-[#28D16C]" : "text-[#5F6368]"
              }`}
            />
          </li>
          <div className={`text-xs hidden sm:block mt-2 w-24 text-center `}>
            4.پرداخت
          </div>
        </div>
      </ul>
    </div>
  );
};

export default ProgressBar;
