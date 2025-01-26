"use client";
import { Button } from "@/components/ui/button";
import { DateFormatDMY, monthNumToMonthName } from "@/helper/dateHandler";
import axios from "axios";
import { Session } from "next-auth";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Ticket from "./ticket";

interface MyTicketsProps {
  session: Session;
}

export interface TicketType {
  id: string;
  subject: string;
  last_mes: string;
  created: string;
  description: string;
  ticket_type: "باز" | "بسته" | "پاسخ داده شده" | "درحال برسی";
  count: number;
  irani: string;
  file: File;
}

const MyTickets: FC<MyTicketsProps> = ({ session }) => {
  const [activeButton, setActiveButton] = useState<
    "all" | "answered" | "open" | "close" | "reviewing"
  >("all");

  const [allData, setAllData] = useState<TicketType[]>([]);
  const [reviewData, setReviewData] = useState<TicketType[]>([]);
  const [answeredData, setAnsweredData] = useState<TicketType[]>([]);

  const fetchTickets = async () => {
    try {
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

  useEffect(() => {
    const reviewing: any = [];
    const answered: any = [];

    allData.forEach((ticket) => {
      if (ticket.ticket_type === "درحال برسی") {
        reviewing.push(ticket);
      } else if (ticket.ticket_type === "پاسخ داده شده") {
        answered.push(ticket);
      }
    });
    setReviewData(reviewing);
    setAnsweredData(answered);
  }, [allData]);

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
                {answeredData.length}
              </div>
            </div>
          </div>
        </button>
        <button
          className={`relative pb-1 ${
            activeButton === "reviewing"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("reviewing")}
        >
          <div className="flex gap-1 justify-center items-center">
            درانتظار پاسخ{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "reviewing" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              <div
                className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                  activeButton === "reviewing" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
                }`}
              >
                {reviewData.length}
              </div>
            </div>
          </div>
        </button>
      </div>

      {activeButton === "all" ? (
        <Ticket allData={allData} />
      ) : activeButton === "reviewing" ? (
        <Ticket allData={reviewData} />
      ) : (
        activeButton === "answered" && <Ticket allData={answeredData} />
      )}
    </>
  );
};

export default MyTickets;
