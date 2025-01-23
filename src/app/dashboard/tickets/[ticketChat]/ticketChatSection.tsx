"use client";

import { Session } from "next-auth";
import { FC, useRef, useState } from "react";
import Messages from "./messages";
import TicketChatInput from "./ticketChatInput";

interface TicketChatSectionProps {
  session: Session | null;
  ticketChat: string;
}

export interface MessageType {
  created: string;
  id: string;
  irani: string;
  message: string;
  message_file: string | null;
  receiver_messager: string;
  sender_messager: string;
  sender_user_phone: string;
  ticket: string;
}

const TicketChatSection: FC<TicketChatSectionProps> = ({
  session,
  ticketChat,
}) => {
  const [successMessage, setSuccessMessage] = useState(false);
  return (
    <>
      <div className="flex-1 justify-between flex flex-col min-h-[calc(100vh-152px)]">
        <Messages
          session={session}
          ticketChat={ticketChat}
          successMessage={successMessage}
        />
        <div className="w-full right-0 mr-0 bottom-5">
          <TicketChatInput
            session={session}
            chatId={ticketChat}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
      </div>
    </>
  );
};

export default TicketChatSection;
