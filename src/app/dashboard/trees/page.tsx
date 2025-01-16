import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import MyTrees from "./myTrees";

interface TreesProps {}

const Trees: FC<TreesProps> = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect("/");
  }
  return (
    <>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl">درخت های من</h1>
      </div>
      <MyTrees session={session} />
    </>
  );
};

export default Trees;
