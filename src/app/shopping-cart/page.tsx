"use client";
import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import { FC, useEffect, useState } from "react";
import RightSideShoppingCart from "./rightSideShoppingCart";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import LeftSideShoppingCart from "./leftSideShoppingCart";

export interface TreeType {
  id: string;
  name: string;
  image: string | null;
  price: number;
  price_off: number;
  comments: number;
  rate_avg: number;
  stock_number: number;
  slug: string;
}
export interface TreeItem {
  id: string;
  tree_type: TreeType;
  quantity: number;
  created: string;
  each_cost: number;
}

interface PriceSummary {
  all_price: number;
}

interface DiscountedPriceSummary {
  all_price_off: number;
}

interface CartData {
  items: TreeItem[];
  all_price: PriceSummary;
  all_price_with_off: DiscountedPriceSummary;
  all_products_count: number;
}

const ShoppingCart: FC = () => {
  const session = useSession();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [resCount, setResCount] = useState<number | undefined>();

  // Fetch session and cart data on component mount or when `refresh` changes
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsloading(true);
        if (session.status === "loading") return;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/api/mycart/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: session?.data?.access
                ? `Bearer ${session?.data.access}`
                : "",
              TOKEN: session?.data?.token ?? "",
            },
          }
        );

        if (response.status === 200) {
          setCartData(response.data);
          if (response.data.all_products_count !== 0) {
            setResCount(response.data.all_products_count);
          }
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("fetch cart data error: ", error);

        toast.error("بارگیری داده ها با شکست مواجه شد لطفا دوباره امتحان کنید");
      } finally {
        setIsloading(false);
      }
    };

    fetchCartData();
  }, [refresh, session?.status]);

  const triggerRefresh = () => setRefresh((prev) => !prev);
  return (
    <>
      <div className="bg-[#EBEBEB]">
        <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
          <Navbar count={resCount} />
          <MobileNav />
          <main>
            {!isLoading || cartData ? (
              <div className="flex flex-col justify-center sm:flex-row gap-3 text-[#1F1F1F] p-4">
                <div>
                  <LeftSideShoppingCart
                    session={session?.data}
                    allPrice={cartData?.all_price.all_price ?? 0}
                    allPriceWithOff={cartData?.all_price_with_off.all_price_off ?? 0}
                    allProductsCount={cartData?.all_products_count ?? 0}
                  />
                </div>
                <div>
                  {cartData && cartData?.items?.length > 0 ? (
                    <div className="rounded-lg bg-white p-3">
                      {cartData?.items?.map((item: TreeItem) => (
                        <RightSideShoppingCart
                          session={session?.data}
                          treeItem={item}
                          key={item.id}
                          onQuantityChange={triggerRefresh}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="justify-center h-full items-center flex text-[#28D16C]">
                      در سبد خرید شما آیتمی وجود ندارد
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </main>
        </div>
        <Footer sponsors={false} />
      </div>
    </>
  );
};

export default ShoppingCart;
