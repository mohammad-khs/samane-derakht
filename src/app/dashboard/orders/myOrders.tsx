"use client";
import { TreeItem } from "@/app/shopping-cart/page";
import { FallbackImage } from "@/components/products/product/headerImages";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import axios from "axios";
import { Loader2, MapPinMinus, MapPinned, MapPinnedIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import {
  FaCaretUp,
  FaCaretDown,
  FaMapPin,
  FaMapMarked,
  FaMapMarkedAlt,
  FaMapMarker,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface MyOrdersProps {
  session: Session;
}

interface Order {
  city_name: string;
  custom_order_id: string;
  final_price: number;
  id: string;
  is_paid: boolean;
  items: TreeItem[];
  location_name: string;
  order_status: string;
  province_name: string;
}

const MyOrders: FC<MyOrdersProps> = ({ session }) => {
  const [activeButton, setActiveButton] = useState<"waiting" | "finished">(
    "finished"
  );
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]); // Track expanded orders

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/myorders/`,
        {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            TOKEN: session?.token,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
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
      <div className="flex gap-3 pb-1 border-b-2 border-[#A3A3A3] mb-4 relative">
        <button
          className={`relative pb-1 ${
            activeButton === "finished"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("finished")}
        >
          <div className="flex gap-1 justify-center items-center">
            انجام شده{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "finished" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              {data.length}
            </div>
          </div>
        </button>
        <button
          className={`relative pb-1 ${
            activeButton === "waiting"
              ? "after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-green-500"
              : "text-[#5F6368]"
          }`}
          onClick={() => setActiveButton("waiting")}
        >
          <div className="flex gap-1 justify-center items-center">
            در انتظار پرداخت{" "}
            <div
              className={`flex justify-center items-center text-xs leading-6 text-white rounded-md px-[4px] ${
                activeButton === "waiting" ? "bg-[#28D16C]" : "bg-[#D9D9D9]"
              }`}
            >
              0
            </div>
          </div>
        </button>
      </div>

      {data.length > 0 ? (
        data.map((order) => (
          <div
            className="p-4 rounded-xl my-2 bg-white"
            dir="rtl"
            key={order.id}
          >
            <div className="text-sm flex flex-col text-center md:text-start md:flex-row justify-between items-center gap-4">
              <div>
                <div className="mb-2 md:mb-0">
                  کد سفارش: {order.custom_order_id}
                </div>
                <div>
                  درخت های خریداری شده:{" "}
                  {order?.items[0]?.tree_type?.name && (
                    <Button size={"sm"} className="m-1" variant={"secondary"}>
                      {order?.items[0]?.tree_type?.name}
                    </Button>
                  )}{" "}
                  {order?.items[1]?.tree_type?.name && (
                    <Button size={"sm"} className="m-1" variant={"secondary"}>
                      {order?.items[1]?.tree_type?.name}
                    </Button>
                  )}{" "}
                  {order.items.length > 1 && (
                    <Button size={"sm"} className="m-1" variant={"secondary"}>
                      بیشتر
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-sm">
                مبلغ:{" "}
                <span className="text-base">
                  {formatNumberWithCommas(order.final_price)}
                </span>{" "}
                تومان
              </div>

              <Button
                className="flex items-center"
                size={"resizble"}
                variant={"lightGray"}
                onClick={() => toggleOrderDetails(order.id)}
              >
                {expandedOrders.includes(order.id) ? (
                  <>
                    بستن جزئیات <FaCaretUp />
                  </>
                ) : (
                  <>
                    دیدن جزئیات <FaCaretDown />
                  </>
                )}
              </Button>
            </div>

            {expandedOrders.includes(order.id) && (
              <div className="mt-3 border-t pt-3">
                {order.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="mb-2 p-3 rounded-md bg-gray-100 flex flex-col md:flex-row  md:justify-between items-center"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                      <span className="ml-2 text-lg">{index + 1}</span>
                      <div className=" flex">
                        <div className="relative w-[148px] h-[100px]  border-2 rounded-lg border-[#D2D2D2]">
                          {item.tree_type.image ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.tree_type.image}`}
                              alt={`عکس درخت ${item.tree_type.image}`}
                              fill
                              className="rounded-lg"
                            />
                          ) : (
                            <div className=" w-full h-full">
                              {FallbackImage()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div>
                          <span>نهال درخت {item.tree_type.name}</span>{" "}
                          <span className="text-[#247C48] underline text-xs">
                            <Link href={`/products/${item?.tree_type.slug}`}>
                              مشاهده محصول
                            </Link>
                          </span>
                        </div>
                        <div className="text-sm text-center mt-2 sm:text-start">
                          تعداد: {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm mt-2">
                      آدرس : {order.province_name}، {order.city_name}،{" "}
                      {order.location_name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>هیچ سفارشی یافت نشد.</div>
      )}
    </>
  );
};

export default MyOrders;
