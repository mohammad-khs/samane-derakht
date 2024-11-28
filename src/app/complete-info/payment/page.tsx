import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { FC } from "react";
import ProgressBar from "../progressBar";
import { redirect } from "next/navigation";
import LeftsidePayment from "./leftsidePayment";
import RightsidePayment from "./rightsidePayment";

interface PaymentProps {}

const Payment: FC<PaymentProps> = async () => {
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/");
  }

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row gap-3 text-[#1F1F1F] p-4">
        <div>
          <LeftsidePayment session={session} />
        </div>

        <div className="rounded-lg bg-white w-full p-5">
          <RightsidePayment session={session} />
        </div>
      </div>
    </>
  );
};

export default Payment;
