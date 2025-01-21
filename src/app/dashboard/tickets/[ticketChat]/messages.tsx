"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { MessageType } from "./chatSection";
import { FaUser } from "react-icons/fa";

interface MessagesProps {
  initialMessages: MessageType[] | undefined;
}

const Messages: FC<MessagesProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<MessageType[] | undefined>(
    initialMessages
  );

  // useEffect(() => {
  //   const messageHandler = (message: MessageType) => {
  //     setMessages((prev) => {
  //       if (prev) {
  //         return [message, ...prev];
  //       }
  //     });
  //   };
  //   setMessages(initialMessages);
  // }, [messages]);

  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  // const formatTimestamp = (timestamp: number) => {
  //   return format(timestamp, "HH:mm");
  // };

  return (
    <div className="flex h-full flex-1 flex-col-reverse gap-4 p-3">
      <div ref={scrollDownRef} />

      {messages?.map((message, index) => {
        const isCurrentUser = message.receiver_messager !== "admin";
        console.log(isCurrentUser);

        const hasNextMessageFromSameUser =
          messages[index - 1]?.sender_user_phone ===
          messages[index].sender_user_phone;

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
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
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
