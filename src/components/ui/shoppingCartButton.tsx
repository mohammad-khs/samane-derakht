"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import SignInModal from "../authentication/signInModal";
import { ShoppingCart } from "lucide-react";

interface ShoppingCartButtonProps {
  propCount?: number | undefined;
  isMobileNav?: boolean;
  isSideBar?: boolean;
}

const ShoppingCartButton: FC<ShoppingCartButtonProps> = ({
  propCount,
  isMobileNav,
  isSideBar,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();

  const [count, setCount] = useState<number | undefined>(propCount);

  // Update count whenever propCount changes
  useEffect(() => {
    if (propCount !== undefined && propCount !== 0) {
      setCount(propCount);
    }
  }, [propCount]);

  // Fetch cart count from API if user is authenticated and propCount is not provided
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/api/cartcount/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: session?.access ? `Bearer ${session.access}` : "",
              TOKEN: session?.token ?? "",
            },
          }
        );
        if (propCount === undefined && response.data.count !== 0) {
          setCount(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };

    if (status === "authenticated" && propCount === undefined) {
      fetchData();
    }
  }, [session, status, propCount]);

  return (
    <>
      {isMobileNav ? (
        status === "authenticated" ? (
          <Link href="/shopping-cart">
            <div className="flex items-center relative gap-4 mx-[-0.65rem] px-3">
              {count && count > 0 && (
                <div className="rounded-full absolute right-0 top-0 h-4 w-4 flex justify-center items-center text-white font-semibold bg-red-600">
                  <div className="text-[10px] leading-none">
                    {count > 9 ? `+9` : count}
                  </div>
                </div>
              )}
              <ShoppingCart className="h-5 w-5" />
              سبد خرید
            </div>
          </Link>
        ) : (
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center relative gap-4 mx-[-0.65rem] px-3"
          >
            <ShoppingCart className="h-5 w-5" />
            سبد خرید
          </div>
        )
      ) : isSideBar ? (
        status === "authenticated" ? (
          <Link href="/shopping-cart">
            <div className="flex relative items-center gap-2 p-2">
              <ShoppingCart className="h-6 w-6" />
              {count && count > 0 && (
                <div className="rounded-full absolute top-1 right-0 h-4 w-4 flex justify-center items-center text-white font-semibold bg-red-600">
                  <div className="text-[10px] leading-none">
                    {count > 9 ? `+9` : count}
                  </div>
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 p-2 cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6" />
          </div>
        )
      ) : status === "authenticated" ? (
        <Link href="/shopping-cart">
          <Button className="relative p-2" variant="icon">
            <div className="flex justify-center gap-3 items-center">
              <div className="relative w-6 h-6">
                <Image
                  className="p-1"
                  alt="سبد فروشگاهی"
                  fill
                  src="/svgs/shoppingCart.svg"
                />
              </div>
              {count && count > 0 && (
                <div className="rounded-full h-4 w-4 flex justify-center items-center text-white font-semibold bg-red-600">
                  <div className="text-[10px] leading-none">
                    {count > 9 ? `+9` : count}
                  </div>
                </div>
              )}
            </div>
          </Button>
        </Link>
      ) : (
        <Button
          onClick={() => setIsModalOpen(true)}
          className="relative p-2"
          variant="icon"
        >
          <div className="flex justify-center gap-3 items-center">
            <div className="relative w-6 h-6">
              <Image
                className="p-1"
                alt="سبد فروشگاهی"
                fill
                src="/svgs/shoppingCart.svg"
              />
            </div>
            {count && count > 0 && (
              <div className="rounded-full h-4 w-4 flex justify-center items-center text-white font-semibold bg-red-600">
                <div className="text-[10px] leading-none">{count}</div>
              </div>
            )}
          </div>
        </Button>
      )}
      {isModalOpen && (
        <SignInModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ShoppingCartButton;
