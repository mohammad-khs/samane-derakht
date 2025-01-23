import { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import TicketChatSection from "./ticketChatSection";

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
      <TicketChatSection session={session} ticketChat={params.ticketChat} />
    </>
  );
};

export default TicketChat;
