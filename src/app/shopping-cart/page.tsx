import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import { FC } from "react";
import LeftSideShoppingCart from "./leftSideShoppingCart";
import RightSideShoppingCart from "./rightSideShoppingCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


interface ShoppingCartProps {}

export interface TreeType {
  id: string;
  name: string;
  image: string | null;
  price: number;
  price_off: number;
  comments: number;
  rate_avg: number;
  stock_number: number;
}
export interface TreeItem {
  id: string;
  tree_type: TreeType;
  quantity: number;
  created: string;
  each_cost: number;
}

const ShoppingCart: FC<ShoppingCartProps> = async () => {
  const session = await getServerSession(authOptions);
  const response = await fetch("https://treeone.liara.run/cart/api/mycart/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.access ? `Bearer ${session.access}` : "",
      TOKEN: session?.token ?? "",
    },
    cache: "no-store",
  });

  const data = await response.json();

  return (
    <>
      <div className="bg-[#EBEBEB]">
        <div className="md:container md:mx-auto md:pt-5 min-h-[65vh]">
          <Navbar />
          <MobileNav />
          <main>
            <div className="flex flex-col justify-center sm:flex-row gap-3 text-[#1F1F1F] p-4">
              <div>
                <LeftSideShoppingCart
                  session={session}
                  allPrice={data.all_price}
                  allPriceWithOff={data.all_price_with_off}
                />
              </div>
              <div>
                <div className="rounded-lg bg-white p-3">
                  {data?.items?.map((item: TreeItem) => (
                    <RightSideShoppingCart treeItem={item} key={item.id} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer sponsors={false} />
      </div>
    </>
  );
};

export default ShoppingCart;
