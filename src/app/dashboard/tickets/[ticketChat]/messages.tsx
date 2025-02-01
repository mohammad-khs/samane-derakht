import { cn } from "@/lib/utils";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Session } from "next-auth";
import { Link, Loader2Icon } from "lucide-react";
import useSWR from "swr";
import { TicketType } from "../myTickets";

interface MessagesProps {
  session: Session | null;
  ticketChat: string;
  setTicketStatus: Dispatch<SetStateAction<TicketType | undefined>>;
  ticketStatus: TicketType | undefined;
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

interface TicketMessages {
  messages: MessageType[];
  ticket: TicketType;
}

const Messages: FC<MessagesProps> = ({
  session,
  ticketChat,
  setTicketStatus,
  ticketStatus,
}) => {
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        Authorization: session?.access ? `Bearer ${session.access}` : "",
        TOKEN: session?.token || "",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch messages");
    return response.json();
  };

  const { data: chatData, isLoading } = useSWR<TicketMessages>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/myticketmessage/${ticketChat}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    setTicketStatus(chatData?.ticket);
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatData]);

  if (isLoading && ticketStatus === undefined) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2Icon className="animate-spin h-10 text-[#28D16C] w-10" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col-reverse gap-4 md:p-3">
      {chatData?.messages.map((message: MessageType, index: number) => {
        const isCurrentUser = message.receiver_messager !== "admin";
        const hasNextMessageFromSameUser =
          chatData.messages[index - 1]?.sender_user_phone ===
          chatData.messages[index].sender_user_phone;

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
                  {message.message_file && (
                    <div
                      key={message.id}
                      className="flex items-center justify-between gap-1 border rounded-md p-2"
                    >
                      <a
                        download={true}
                        target="_blank"
                        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${message.message_file}`}
                        className="text-xs sm:text-sm truncate w-16"
                      >
                        {message.message_file}
                      </a>
                    </div>
                  )}
                  {/* <span className="ml-2 text-xs text-gray-400">
                    {formatTimestamp(message.timeStamp)}
                  </span> */}
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
