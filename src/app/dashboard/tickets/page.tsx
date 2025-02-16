import { Button } from "@/components/ui/button";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PlusCircleIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";
import MyTickets from "./myTickets";



const Tickets: FC = async () => {
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/");
  }

  return (
    <>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl">ثبت تیکت</h1>
        <Link href={"tickets/add-ticket"}>
          <Button className="bg-[#F2B93B]" variant={"green"} size={"resizble"}>
            <span className="ml-2">
              <PlusCircleIcon />
            </span>
            افزودن تیکت
          </Button>
        </Link>
      </div>
      <MyTickets session={session} />
    </>
  );
};

export default Tickets;
