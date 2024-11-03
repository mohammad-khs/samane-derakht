"use client";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import axios from "axios";

interface ShoppingCartButtonProps {}

const ShoppingCartButton: FC<ShoppingCartButtonProps> = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const access = localStorage.getItem("access");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://treeone.liara.run/cart/api/cartcount/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: access ? `Bearer ${access}` : "",
              TOKEN: token ?? "",
            },
          }
        );
        setCount(response.data.count);
        console.log(response.data.count);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Link href={"/shopping-cart"}>
        <Button className="relative p-2" variant={"icon"}>
          <div className="flex justify-center gap-3 items-center">
            <div className="relative w-6 h-6">
              <Image
                className="p-1"
                alt="سبد فروشگاهی"
                fill
                src={"/svgs/shoppingCart.svg"}
              />
            </div>
            {count > 0 && (
              <div className="rounded-full h-4 w-4 flex justify-center items-center text-white font-semibold bg-red-600">
                <div className="text-[10px] leading-none">{count}</div>
              </div>
            )}
          </div>
        </Button>
      </Link>
    </>
  );
};

export default ShoppingCartButton;
