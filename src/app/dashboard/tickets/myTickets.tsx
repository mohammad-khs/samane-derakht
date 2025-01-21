"use client";
import { Button } from "@/components/ui/button";
import { DateFormatDMY, monthNumToMonthName } from "@/helper/dateHandler";
import axios from "axios";
import { Session } from "next-auth";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface MyTicketsProps {
  session: Session;
}

interface Ticket {
  id: string;
  subject: string;
  last_mes: string;
  created: string;
  description: string;
  ticket_type: string;
  count: number;
  irani: string;
  file: File;
}

const MyTickets: FC<MyTicketsProps> = ({ session }) => {
  const [activeButton, setActiveButton] = useState<
    "all" | "answered" | "open" | "close" | "reviewing"
  >("all");

  const [allData, setAllData] = useState<Ticket[]>([]);
  const [reviewData, setReviewData] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    try {
      // Make the GET request using Axios
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mytickets/`,
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );

      if (response.status === 200) {
        setAllData(response.data);
      }
      console.log("response : ", response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <div className="flex gap-3 pb-1 border-b-2 border-[#A3A3A3] mb-4 relative">
        <button
          className={`relative pb-1 ${
            activeButton === "all"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("all")}
        >
          <div className="flex gap-1 justify-center items-center">
            همه{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "all" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              {allData.length}
            </div>
          </div>
        </button>
        <button
          className={`relative pb-1 ${
            activeButton === "answered"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("answered")}
        >
          <div className="flex gap-1 justify-center items-center">
            پاسخ داده شده{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "answered" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              <div
                className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                  activeButton === "answered" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
                }`}
              >
                {allData.length}
              </div>
            </div>
          </div>
        </button>
      </div>

      {allData.map((data) => {
        const dateInfo = DateFormatDMY(data.irani);
        return (
          <div key={data.id} className="rounded-xl my-2 bg-white">
            <br />
            <div className="mx-4 flex justify-between items-center" dir="rtl">
              <div>
                <h2 className="text-lg">{data.subject}</h2>
                <div className="text-[#898989]">{data.description}</div>
              </div>
              <div>
                <Link href={`tickets/${data.id}/`}>
                  <Button variant={"lightGray"}>
                    وضعیت {data.ticket_type}
                  </Button>
                </Link>
                {dateInfo && (
                  <div className="text-end mt-2">
                    {dateInfo.year} {monthNumToMonthName(dateInfo.month)}{" "}
                    {dateInfo.day}
                  </div>
                )}
              </div>
            </div>
            <br />
          </div>
        );
      })}
    </>
  );
};

export default MyTickets;
