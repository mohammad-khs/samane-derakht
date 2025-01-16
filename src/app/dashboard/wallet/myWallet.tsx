"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { FC, useEffect, useState } from "react";

interface MyWalletProps {
  session: Session;
}

const MyWallet: FC<MyWalletProps> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const fetchFinishedOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mywallet/`,
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching Orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFinishedOrders();
  }, []);
  if (loading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl p-4 bg-white ">
        <div>wallet</div>
      </div>
    </>
  );
};

export default MyWallet;
