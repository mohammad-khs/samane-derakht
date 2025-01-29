"use client";

import { Session } from "next-auth";
import { FC } from "react";
import Messages from "./messages";
import TicketChatInput from "./ticketChatInput";

interface TicketChatSectionProps {
  session: Session | null;
  ticketChat: string;
}

const TicketChatSection: FC<TicketChatSectionProps> = ({
  session,
  ticketChat,
}) => {
  return (
    <div className="flex-1 justify-between flex flex-col min-h-[calc(100vh-152px)]">
      <Messages session={session} ticketChat={ticketChat} />
      <div className="w-full right-0 mr-0 bottom-5">
        <TicketChatInput session={session} chatId={ticketChat} />
      </div>
    </div>
  );
};

export default TicketChatSection;