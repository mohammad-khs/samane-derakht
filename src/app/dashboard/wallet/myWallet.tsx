"use client";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import axios from "axios";
import { ArrowDownToLine, ArrowUpToLine, Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { FC, useEffect, useState } from "react";
import DepositModal from "./depositModal";

interface MyWalletProps {
  session: Session;
}

interface BalanceType {
  balance: number;
  balance_last_week: number;
  balance_last_month: number;
  balance_last_year: number;
}

const MyWallet: FC<MyWalletProps> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BalanceType>();
  const [depositModalIsOpen, setDepositModalIsOpen] = useState<boolean>(false);
  const fetchFinishedOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mywallet/`,
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data as BalanceType);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching Orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFinishedOrders();
  }, []);
  if (loading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  if (data === undefined) {
    return <div>لطفا صفحه را رفرش کنید</div>;
  }

  return (
    <>
      <div className="gap-4 flex flex-col md:flex-row">
        <div className="rounded-xl p-4 flex flex-col justify-between gap-2 text-[#5F6368] bg-white basis-1/3">
          <div>موجودی فعلی:</div>
          <div>
            <span className="text-sm">تومان</span>{" "}
            <span className="text-2xl text-[#28D16C]">
              {formatNumberWithCommas(data.balance)}
            </span>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={(e) => setDepositModalIsOpen(true)}
              className="w-full"
              variant={"green"}
            >
              <div className="flex gap-4 items-center">
                <span>واریز </span>
                <ArrowDownToLine className="w-5 h-5" />
              </div>
            </Button>
            <Button className="bg-[#F2B93B] w-full" variant={"green"}>
              <div className="flex gap-4 items-center">
                <span>برداشت </span>
                <ArrowUpToLine className="w-5 h-5" />
              </div>
            </Button>
          </div>
        </div>

        <div className="rounded-xl p-4 text-[#5F6368] bg-white basis-2/3">
          <div className="flex items-center gap-4 ">
            <div className="shrink-0">موجودی هفته : </div>
            <div className="border-b-2 border-dashed w-full"></div>
            <div className="h-8 bg-[#EAEAEA] rounded-md py-2 px-4 ">
              {formatNumberWithCommas(data.balance_last_week)}
            </div>
          </div>
          <div className="flex items-center gap-4 my-2">
            <div className="shrink-0">موجودی ماه : </div>
            <div className="border-b-2 border-dashed w-full"></div>
            <div className="h-8 bg-[#EAEAEA] rounded-md py-2 px-4 ">
              {formatNumberWithCommas(data.balance_last_month)}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="shrink-0">موجودی سال : </div>
            <div className="border-b-2 border-dashed w-full"></div>
            <div className="h-8 bg-[#EAEAEA] rounded-md py-2 px-4 ">
              {formatNumberWithCommas(data.balance_last_year)}
            </div>
          </div>
        </div>
      </div>
      {depositModalIsOpen && <DepositModal session={session} onClose={() => setDepositModalIsOpen(false)} />}
    </>
  );
};

export default MyWallet;
