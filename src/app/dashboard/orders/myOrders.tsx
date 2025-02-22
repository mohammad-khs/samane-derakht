"use client";
import { TreeItem } from "@/app/shopping-cart/page";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";

import { FC, useEffect, useState } from "react";
import MyOrdersSection from "./myOrdersSection";

interface MyOrdersProps {
  session: Session;
}

export interface Order {
  city_name: string;
  custom_order_id: string;
  final_price: number;
  id: string;
  is_paid: boolean;
  items: TreeItem[];
  location_name: string;
  order_status: string;
  province_name: string;
}

const MyOrders: FC<MyOrdersProps> = ({ session }) => {
  const [activeButton, setActiveButton] = useState<"waiting" | "finished">(
    "waiting"
  );
  const [finishedData, setFinishedData] = useState<Order[]>([]);
  const [waitingdata, setWaitingData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFinishedOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/myorders/`,
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      if (response.status === 200) {
        setFinishedData(response.data);
      }
    } catch (error) {
      console.error("Error fetching Orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWaitingOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/myorders/`,
        {
          params: {
            NP: true,
          },
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      if (response.status === 200) {
        setWaitingData(response.data);
      }
    } catch (error) {
      console.error("Error fetching Orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinishedOrders();
    fetchWaitingOrders();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3 pb-1 border-b-2 border-[#A3A3A3] mb-4 relative">
        <button
          className={`relative pb-1 ${
            activeButton === "waiting"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("waiting")}
        >
          <div className="flex gap-1 justify-center items-center">
            در انتظار پرداخت{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "waiting" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              <div
                className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                  activeButton === "waiting" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
                }`}
              >
                {waitingdata.length}
              </div>
            </div>
          </div>
        </button>
        <button
          className={`relative pb-1 ${
            activeButton === "finished"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("finished")}
        >
          <div className="flex gap-1 justify-center items-center">
            انجام شده{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "finished" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              {finishedData.length}
            </div>
          </div>
        </button>
      </div>

      {activeButton === "finished" ? (
        <MyOrdersSection isWaitingData={false} data={finishedData} />
      ) : (
        <MyOrdersSection isWaitingData={true} data={waitingdata} />
      )}
    </>
  );
};

export default MyOrders;
