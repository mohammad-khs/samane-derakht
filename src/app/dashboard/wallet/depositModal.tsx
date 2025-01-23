"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { stringIsNotNumber } from "@/helper/validateNumber";
import axios from "axios";
import { Session } from "next-auth";
import { FC, useState } from "react";
import toast from "react-hot-toast";
interface DepositModalProps {
  onClose: () => void; // Optional callback for closing the modal
  session: Session | null;
}

const DepositModal: FC<DepositModalProps> = ({ onClose, session }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [depositValue, setDepositValue] = useState("");

  const handleDeposit = async () => {
    setLoading(true);
    const amountNotEnough = parseInt(depositValue) < 1000000;
    if (amountNotEnough) {
      toast.error("مبلغ وارد شده کمتر از حداقل مقدار واریزی است", {
        duration: 7000,
      });
      setLoading(false);
      return;
    }
    if (stringIsNotNumber(depositValue)) {
      toast.error("مقدار وارد شده صحیح نمیباشد", {
        duration: 7000,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/deposit/`,
        { amount: depositValue },
        {
          headers: {
            Authorization: session?.access ? `Bearer ${session.access}` : "",
            TOKEN: session?.token || "",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        const data = response.data;
        console.log(data);
        toast.success("به صفحه پرداخت هدایت می‌شوید");
        onClose();
        window.open(`${response.data.url}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data?.email?.[0] === "Enter a valid email address."
        ) {
          toast.error("لطفا ایمیلی با فرمت درست وارد کنید", { duration: 7000 });
        }

        if (error.response?.data[0] === "email is not valid") {
          toast.error("لطفا ایمیلی با فرمت درست وارد کنید", { duration: 7000 });
        }
        toast.error("ثبت تغییرات شما با شکست مواجه شد لطفا دوباره امتحان کنید");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "modal-container" && onClose) {
      onClose();
    }
  };

  return (
    <div
      id="modal-container"
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="justify-center text-xl flex items-center flex-col gap-5 mb-5">
          واریز
        </div>

        <div>
          <div>
            <label className="text-[#1F1F1F]" htmlFor="phone">
              مبلغ
            </label>
            <div>
              <Input
                className="w-full my-3"
                id="phone"
                value={depositValue}
                onChange={(e) => setDepositValue(e.target.value)}
                type="text"
                variant="default"
                size="lg"
                placeholder="شماره تماس خود را وارد نمایید"
              />
            </div>
          </div>

          <Button
            disabled={loading}
            onClick={handleDeposit}
            style={{ direction: "rtl" }}
            variant={"green"}
            size={"lg"}
            className="w-full mb-2"
          >
            {loading ? "در حال تأیید..." : "ثبت و تایید"}
          </Button>
          <Button
            onClick={onClose}
            style={{ direction: "rtl" }}
            variant={"outline"}
            size={"lg"}
            className="w-full"
          >
            انصراف
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
