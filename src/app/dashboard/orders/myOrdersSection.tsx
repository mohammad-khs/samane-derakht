import { FallbackImage } from "@/components/products/product/headerImages";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Order } from "./myOrders";

interface MyOrdersSectionProps {
  data: Order[];
}

const MyOrdersSection: FC<MyOrdersSectionProps> = ({ data }) => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]); // Track expanded orders
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  return (
    <>
      {data.length > 0 ? (
        data.map((order: Order) => (
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

export default MyOrdersSection;
