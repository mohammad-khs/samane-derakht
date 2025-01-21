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
      <div>
        <ChatSection session={session} ticketChat={params.ticketChat} />
        <ChatInput
          session={session}
          chatId={params.ticketChat}
          chatPartner={"asdfhasdf"}
        />
      </div>
    </>
  );
};

export default TicketChat;
