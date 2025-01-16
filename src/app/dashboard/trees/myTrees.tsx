"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";

import { FC, useEffect, useState } from "react";
import MyTreesSection from "./myTreesSection";

interface MyTreesProps {
  session: Session;
}

export interface MyTreeItem {
  id: string;
  tree_name: string;
  scan_numbers: number;
  allowed_to_ask_for_status: boolean;
  button_status: boolean;
  city_name: string;
  latitud: string;
  location_name: string;
  longtitud: string;
  order_custom_id: string;
  price: number;
  province_name: string;
  show_status_message: null | string;
  tree_type_image: string;
}

interface MyTrees {
  data: MyTreeItem[];
  offset: number;
}

const MyTrees: FC<MyTreesProps> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MyTrees>();
  const fetchFinishedOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mytrees/`,
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data as MyTrees);
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
      <div>
        {data?.data.map((treeItem: MyTreeItem) => (
          <MyTreesSection item={treeItem} />
        ))}
      </div>
    </>
  );
};

export default MyTrees;
