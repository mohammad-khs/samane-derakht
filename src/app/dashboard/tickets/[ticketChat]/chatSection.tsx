"use client";
import axios from "axios";
import { Session } from "next-auth";
import { FC, useEffect, useState } from "react";
import Messages from "./messages";
import { Loader2Icon } from "lucide-react";

interface ChatSectionProps {
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

const ChatSection: FC<ChatSectionProps> = ({ session, ticketChat }) => {
  const [chatData, setChatData] = useState<MessageType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTicketChat = async () => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/myticketmessage/${ticketChat}`,
        {
          headers: {
            Authorization: session?.access ? `Bearer ${session.access}` : "",
            TOKEN: session?.token || "",
          },
        }
      );

      if (data.status !== 200) {
        throw new Error("Failed to fetch ticketMessage");
      }
      if (data.status === 200) {
        console.log(data);
        setChatData(data.data as MessageType[]);
        return data;
      }
    } catch (error) {
      console.error("Error fetching ticketMessage:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketChat();
  }, []);

  console.log(chatData);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2Icon className="animate-spin h-10 text-[#28D16C] w-10" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Messages initialMessages={chatData} />
      </div>
    </>
  );
};

export default ChatSection;
