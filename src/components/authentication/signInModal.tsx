"use client";
import axios from "axios";
import { useState, useEffect, FC } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { stringIsNotNumber } from "@/helper/validateNumber";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuthResponse {
  token: string;
  accessToken: string;
}

export const storeTokensInLocalStorage = (access: string, token: string) => {
  localStorage.setItem("access", access);
  localStorage.setItem("token", token);
};

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
    } else {
      setLoading(true);
      try {
        const response = await fetch("https://treeone.liara.run/account/api/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: phone[0] === "0" ? `${phone}` : `0${phone}`,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setAuthResponse(data); // Store the token in authResponse
          setStep("otp");
          setTimer(60); // Start 1-minute countdown

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
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length < 5 || otp.length > 5 || stringIsNotNumber(otp)) {
      setError(Error("کد ارسالی وارد شده دارای فرمت صحیح نمی‌باشد"));
      return;
    }
    if (!authResponse?.token) {
      toast.error("توکن احراز حویت وجود ندارد لطفا دوباره امتحان کنید");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://treeone.liara.run/account/api/verify/",
        { otp },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authResponse.token}`,
          },
        }
      );

      if (response.status === 200) {
        const { access, refresh, token } = response.data;
        storeTokensInLocalStorage(access, token);
        // await axios.post("/api/auth", { access, refresh, token });

        console.log("Login successful:", response.data);
        onClose();
      } else {
        toast.error(
          "دسترسی غیرمجاز. لطفاً کد تأیید را بررسی کرده و دوباره تلاش کنید"
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error Response:", error.response.data);
        toast.error(
          error.response.data.message || "دسترسی غیر مجاز یا کد ارسالی اشتباه"
        );
      } else {
        console.error("Request error:", error);
        toast.error("یک خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید");
      }
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
              <div className="text-xs mb-5" style={{ direction: "rtl" }}>
                ورود شما به منزله پذیرش{" "}
                <span className="text-blue-500">قوانین</span> و{" "}
                <span className="text-blue-500">حریم خصوصی</span> می‌باشد.
              </div>
            )}
            <Button
              onClick={handlePhoneSubmit}
              variant={"green"}
              className="w-full"
              disabled={loading || timer > 0}
            >
              {loading ? (
                "درحال ارسال"
              ) : timer > 0 ? (
                `${timer} زمان باقی مانده تا ارسال کد جدید`
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
              <div className="text-red-600 text-sm">{error?.message}</div>
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
              variant={"outline"}
              className="w-full text-[#28D16C] mt-2 hover:bg-transparent border-[#28D16C] disabled:border-[#5F6368] disabled:text-[#5F6368]"
              disabled={loading || timer > 0}
            >
              {loading ? (
                "درحال ارسال"
              ) : timer > 0 ? (
                `${timer} زمان باقی مانده تا ارسال کد جدید`
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
