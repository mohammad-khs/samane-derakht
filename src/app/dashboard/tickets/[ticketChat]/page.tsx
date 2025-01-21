import { FC } from "react";
import ChatInput from "./chatInput";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ChatSection from "./chatSection";

interface TicketChatProps {
  params: {
    ticketChat: string;
  };
}

const TicketChat: FC<TicketChatProps> = async ({ params }) => {
  console.log(params);

  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex-1 justify-between flex flex-col min-h-[calc(100vh-152px)]">
        <ChatSection session={session} ticketChat={params.ticketChat} />
        <div className="w-full right-0 mr-0 bottom-5">
          <ChatInput
            session={session}
            chatId={params.ticketChat}
          />
        </div>
      </div>
    </>
  );
};

export default TicketChat;
