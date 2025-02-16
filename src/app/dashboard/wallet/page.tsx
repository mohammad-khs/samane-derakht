import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import MyWallet from "./myWallet";
import MyTransactions from "../transactions/myTransactions";



const Wallet: FC = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect("/");
  }
  return (
    <>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl">کیف پول من</h1>
      </div>
      <div className=" text-lg font-semibold mt-5 mb-2">مانده</div>
      <MyWallet session={session} />
      <div className="text-lg font-semibold mt-5 mb-2">گزارش مالی</div>
      <MyTransactions session={session} />
    </>
  );
};

export default Wallet;
