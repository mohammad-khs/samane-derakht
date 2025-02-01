import { Button } from "@/components/ui/button";
import { DateFormatDMY, monthNumToMonthName } from "@/helper/dateHandler";
import Link from "next/link";
import { FC } from "react";
import { TicketType } from "./myTickets";

interface TicketProps {
  allData: TicketType[];
}

const Ticket: FC<TicketProps> = ({ allData }) => {
  return allData.map((data) => {
    const dateInfo = DateFormatDMY(data.irani);
    return (
      <div key={data.id} >
        <div className="rounded-xl my-2 bg-white">
          <br />
          <div className="mx-4 flex justify-between items-center" dir="rtl">
            <div>
              <h2 className="text-lg">{data.subject}</h2>
              <div className="text-[#898989]">{data.description}</div>
            </div>
            <div>
              {data.ticket_type === "بسته" ? (
                <Link href={`tickets/${data.id}/`}>
                  <Button
                    disabled={true}
                    className="bg-slate-500"
                    variant={"green"}
                  >
                    وضعیت {data.ticket_type}
                  </Button>
                </Link>
              ) : (
                <Link href={`tickets/${data.id}/`}>
                  <Button variant={"lightGray"}>
                    وضعیت {data.ticket_type}
                  </Button>
                </Link>
              )}
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
      </div>
    );
  });
};

export default Ticket;
