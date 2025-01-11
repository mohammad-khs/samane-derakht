"use client";
import axios from "axios";
import { Session } from "next-auth";
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
  file: File;
}

const MyTickets: FC<MyTicketsProps> = ({ session }) => {
  const [activeButton, setActiveButton] = useState<
    "all" | "answered" | "waiting"
  >("all");

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

      // The response data is directly available as response.data in Axios
      console.log("response : ", response.data);
      
    } catch (error) {
      // Error handling: If the request fails
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
          همه
        </button>
        <button
          className={`relative pb-1 ${
            activeButton === "answered"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("answered")}
        >
          پاسخ داده شده
        </button>
        <button
          className={`relative pb-1 ${
            activeButton === "waiting"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("waiting")}
        >
          در انتظار پاسخ
        </button>
      </div>
      <div className="rounded-xl bg-white">
        <br />
        <div className=" mx-4 mr-4 sm:mx-24" dir="rtl">
          <div className="">
            <div className="gap-8">
              <div className="flex flex-col  items-center md:items-start">
                <label
                  className="text-sm text-[#1F1F1F]"
                  htmlFor="ticket-subject"
                >
                  عنوان تیکت
                </label>
                <div className="w-64"></div>
              </div>
            </div>
          </div>

          <br />
        </div>
      </div>
    </>
  );
};

export default MyTickets;
