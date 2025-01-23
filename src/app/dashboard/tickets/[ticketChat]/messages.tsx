"use client";

import { cn } from "@/lib/utils";
import {
  FC,
  useEffect,
  useState,
} from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { Session } from "next-auth";
import { Loader2Icon } from "lucide-react";

interface MessagesProps {
  session: Session | null;
  ticketChat: string;
  successMessage: boolean;
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

const Messages: FC<MessagesProps> = ({
  session,
  ticketChat,
  successMessage,
}) => {
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
  }, [successMessage]);

  useEffect(() => {
    {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [chatData]);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2Icon className="animate-spin h-10 text-[#28D16C] w-10" />
      </div>
    );
  }

  // useEffect(() => {
  //   const messageHandler = (message: MessageType) => {
  //     setMessages((prev) => {
  //       if (prev) {
  //         return [message, ...prev];
  //       }
  //     });
  //   };
  //   setMessages(chatData);
  // }, [messages]);

  // const formatTimestamp = (timestamp: number) => {
  //   return format(timestamp, "HH:mm");
  // };

  return (
    <div className="flex h-full flex-1 flex-col-reverse gap-4 md:p-3">
      {chatData?.map((message, index) => {
        const isCurrentUser = message.receiver_messager !== "admin";
        console.log(isCurrentUser);

        const hasNextMessageFromSameUser =
          chatData[index - 1]?.sender_user_phone ===
          chatData[index].sender_user_phone;

        return (
          <div
            className="chat-message"
            key={`${message.id}-${message.created}`}
          >
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base  max-w-[280px] sm:max-w-xs mx-2 overflow-x-auto",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block", {
                    "bg-[#28D16C] text-white": isCurrentUser,
                    "bg-white text-gray-900": !isCurrentUser,
                    "rounded-br-none":
                      !hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.message}{" "}
                  <span className="ml-2 text-xs text-gray-400">
                    {/* {formatTimestamp(message.timeStamp)} */}
                  </span>
                </span>
              </div>

              <div
                className={cn("relative w-10 h-10", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                {/* <Image
                  fill
                  src={
                    isCurrentUser ? (message.userImage as string) : chatPartner.image
                  }
                  alt="Profile picture"
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                /> */}

                <div className="rounded-full bg-white h-10 w-10 flex justify-center items-center">
                  <FaUser className="h-6 w-6 text-[#5F6368]" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
