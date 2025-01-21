"use client";
import axios from "axios";
import { Session } from "next-auth";
import { FC, useEffect, useState } from "react";

interface ChatSectionProps {
  session: Session | null;
  ticketChat: string;
}

const ChatSection: FC<ChatSectionProps> = ({ session, ticketChat }) => {


  const [chatData, setChatData] = useState();
  const fetchTicketChat = async () => {
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
        setChatData(data.data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching ticketMessage:", error);
    }
  };

  useEffect(() => {
    fetchTicketChat();
  }, []);

  console.log(chatData);

  return (
    <>
      <div></div>
    </>
  );
};

export default ChatSection;
