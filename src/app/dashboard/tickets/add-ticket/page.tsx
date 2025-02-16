import { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AddTicketSection from "./addTicketSection";
import { redirect } from "next/navigation";


const AddTicket: FC = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect("/");
  }
  return (
    <>
      <AddTicketSection session={session} />
    </>
  );
};

export default AddTicket;
