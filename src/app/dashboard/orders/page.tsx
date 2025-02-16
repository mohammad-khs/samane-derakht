import { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyOrders from "./myOrders";


const Orders: FC = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect("/");
  }
  return (
    <>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl">سفارش‌ها</h1>
      </div>
      <MyOrders session={session} />
    </>
  );
};

export default Orders;
