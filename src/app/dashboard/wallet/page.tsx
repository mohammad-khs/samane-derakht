import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import MyWallet from "./myWallet";

interface WalletProps {}

const Wallet: FC<WalletProps> = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect("/");
  }
  return (
    <>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl">گزارش مالی</h1>
      </div>
      <MyWallet session={session} />
    </>
  );
};

export default Wallet;
