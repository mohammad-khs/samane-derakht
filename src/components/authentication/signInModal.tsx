"use client";
import { useState, useEffect, FC } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { formatMinutes, stringIsNotNumber } from "@/helper/validateNumber";
import TermsAndConditions from "./termsAndConditions";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuthResponse {
  token: string;
  otp_send: boolean;
}

const SignInModal: FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (
      (step === "phone" && phone.length <= 9 && error?.message) ||
      (step === "otp" && otp.length <= 4 && error?.message)
    ) {
      setError(undefined);
    }
    let countdown: NodeJS.Timeout | undefined;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer, phone, error]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "modal-container") onClose();
  };

  const handlePhoneSubmit = async () => {
    if (phone.length < 10 || phone.length > 11 || stringIsNotNumber(phone)) {
      setError(Error("شماره تلفن وارد شده دارای فرمت صحیح نمی‌باشد"));
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: phone[0] === "0" ? `${phone}` : `0${phone}`,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAuthResponse(data); // Store the token in authResponse
        setStep("otp");
        setTimer(120); // Start 1-minute countdown
        setError(undefined);
        console.log("Auth response received:", data);
      } else {
        toast.error("ارور در فرستادن کد ارسالی");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length < 5 || otp.length > 5 || stringIsNotNumber(otp)) {
      setError(Error("کد ارسالی وارد شده دارای فرمت صحیح نمی‌باشد"));
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        phone,
        otp,
        token: authResponse?.token,
      });

      if (result?.ok) {
        toast.success("ورود موفقیت‌آمیز");
        onClose();
      } else {
        toast.error("دسترسی غیرمجاز یا کد ارسالی اشتباه");
      }
    } catch (error) {
      toast.error("یک خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید");
      console.error("Request error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-container"
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="justify-center flex items-center flex-col gap-5 mb-5">
          <Button variant={"green"} size={"icon"}></Button>
          ثبت نام/ورود
        </div>
        <h2 className="text-lg font-semibold mb-4">
          {step === "phone" ? "شماره موبایل " : "کد ارسالی"}
        </h2>
        {step === "phone" ? (
          <div>
            <input
              style={{ direction: "rtl" }}
              type="tel"
              placeholder="شماره موبایل خود را وارد نمایید ."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full p-2 border placeholder:text-[#B8B8B8] ${
                phone.length > 0 && error?.message
                  ? "border-red-600"
                  : "border-gray-300 "
              } rounded mb-4`}
            />
            {phone.length > 0 && error?.message ? (
              <div className="text-red-600  mb-5 text-sm">{error?.message}</div>
            ) : (
              <TermsAndConditions />
            )}
            <Button
              onClick={handlePhoneSubmit}
              variant={"green"}
              className="w-full mt-4"
              disabled={loading || timer > 0}
            >
              {loading ? (
                "درحال ارسال"
              ) : timer > 0 ? (
                `${formatMinutes(timer)} زمان باقی مانده تا ارسال کد جدید`
              ) : (
                <div className="flex justify-center items-center text-sm">
                  <CaretLeftIcon className="h-8 w-8" /> ارسال کد
                </div>
              )}
            </Button>
          </div>
        ) : (
          <div>
            <input
              style={{ direction: "rtl" }}
              type="text"
              placeholder="لطفا کد ارسالی را وارد کنید"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={`w-full p-2 border placeholder:text-[#B8B8B8] ${
                otp.length > 0 && error?.message
                  ? "border-red-600"
                  : "border-gray-300 "
              } rounded mb-4`}
            />
            {otp.length > 0 && error?.message && (
              <div className="text-red-600  mb-5 text-sm">{error?.message}</div>
            )}
            <Button
              style={{ direction: "rtl" }}
              onClick={handleOtpSubmit}
              variant={"green"}
              className="w-full"
              disabled={loading}
            >
              {loading ? "در حال تأیید..." : "مرحله بعدی"}
            </Button>
            <Button
              onClick={handlePhoneSubmit}
              variant={"green"}
              className="w-full mt-4"
              disabled={loading || timer > 0}
            >
              {loading ? (
                "درحال ارسال"
              ) : timer > 0 ? (
                `${formatMinutes(timer)} زمان باقی مانده تا ارسال کد جدید`
              ) : (
                <div className="flex justify-center items-center text-sm">
                  <CaretLeftIcon className="h-8 w-8" /> ارسال کد
                </div>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
