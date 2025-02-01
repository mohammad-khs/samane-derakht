"use client";

import { Session } from "next-auth";
import { FC, useState } from "react";
import Messages from "./messages";
import TicketChatInput from "./ticketChatInput";
import { TicketType } from "../myTickets";
import { CheckCircle2 } from "lucide-react";

interface TicketChatSectionProps {
  session: Session | null;
  ticketChat: string;
}

const TicketChatSection: FC<TicketChatSectionProps> = ({
  session,
  ticketChat,
}) => {
  const [ticketStatus, setTicketStatus] = useState<TicketType>();
  return (
    <div className="flex-1 justify-between flex flex-col min-h-[calc(100vh-152px)]">
      <Messages
        ticketStatus={ticketStatus}
        setTicketStatus={setTicketStatus}
        session={session}
        ticketChat={ticketChat}
      />
      {ticketStatus?.ticket_type !== "بسته" ? (
        <div className="w-full right-0 mr-0 bottom-5">
          <TicketChatInput session={session} chatId={ticketChat} />
        </div>
      ) : (
        <div className="w-full right-0 mr-0 bottom-5 h-20 bg-white flex justify-center items-center rounded-lg mt-6">
        <h2 className=" sm:text-lg  font-semibold  flex gap-2">
          <CheckCircle2 /> تیکت بسته شده است
        </h2>
      </div>
      )}
    </div>
  );
};

export default TicketChatSection;
