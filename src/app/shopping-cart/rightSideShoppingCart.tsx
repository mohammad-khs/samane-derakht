"use client";
import { FallbackImage } from "@/components/products/product/headerImages";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { FaCommentAlt, FaStar } from "react-icons/fa";
import { TreeItem } from "./page";
import Link from "next/link";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";
import { Session } from "next-auth";
import toast from "react-hot-toast";

interface RightSideShoppingCartProps {
  treeItem: TreeItem;
  session: Session | null;
  onQuantityChange: () => void;
}

const RightSideShoppingCart: FC<RightSideShoppingCartProps> = ({
  treeItem,
  session,
  onQuantityChange,
}) => {
  const handleDecrement = async () => {
    try {
      const response = await fetch(
        `https://treeone.liara.run/cart/api/reduce/${treeItem.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: session?.access ? `Bearer ${session.access}` : "",
            TOKEN: session?.token ?? "",
          },
        }
      );
      if (response.ok) {
        onQuantityChange(); // trigger re-fetch on successful decrement
      }
    } catch {
      toast.error("مشکلی پیش آمد لطفا دوباره تلاش کنید");
    }
  };

  const handleIncrement = async () => {
    try {
      const response = await fetch(
        `https://treeone.liara.run/cart/api/increase/${treeItem.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: session?.access ? `Bearer ${session.access}` : "",
            TOKEN: session?.token ?? "",
          },
        }
      );
      if (response.ok) {
        onQuantityChange(); // trigger re-fetch on successful increment
      }
    } catch {
      toast.error("مشکلی پیش آمد لطفا دوباره تلاش کنید");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row " style={{ direction: "rtl" }}>
        <div className="justify-center items-center flex">
          <div className="relative w-[188px] h-[140px]  border-2 rounded-lg border-[#D2D2D2]">
            {treeItem.tree_type.image ? (
              <Image
                src={`https://treeone.liara.run/${treeItem.tree_type.image}`}
                alt={`عکس درخت ${treeItem.tree_type.image}`}
                fill
                className="rounded-lg"
              />
            ) : (
              <div className=" w-full h-full">{FallbackImage()}</div>
            )}
          </div>
        </div>
        <div className="mx-3">
          <h1 className="text-xl mt-3 font-semibold">
            نحال درخت {treeItem?.tree_type?.name}{" "}
            <span className="text-[#247C48] underline text-xs">
              <Link href={`/products/${treeItem?.tree_type.id}`}>
                مشاهده محصول
              </Link>
            </span>
          </h1>
          <div className="flex my-2 justify-start gap-3 mx-1">
            <div className="mt-auto">
              <div className=" flex justify-center items-center gap-2">
                <span className="text-[#797979]">کامنت</span>
                <span>{treeItem.tree_type?.comments}</span>
                <FaCommentAlt className="text-[#C0C0C0]" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex justify-center items-center gap-2">
                <span className="text-[#797979]">امتیاز</span>
                <span>{treeItem.tree_type.rate_avg?.toFixed(1) || 0}</span>
                <FaStar className="text-[#F2B93B] mb-1" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 md:gap-28 lg:gap-36 mt-5 justify-between">
            <div className="flex gap-3 justify-around items-center text-lg  px-2 py-1 rounded-lg border-2 border-[#28D16C]">
              <button title="increase" type="button" onClick={handleIncrement}>
                <Plus className="text-[#848484]" />
              </button>
              <div className="mx-5">{treeItem.quantity}</div>
              <button title="decrease" type="button" onClick={handleDecrement}>
                <Minus className="text-[#848484]" />
              </button>
            </div>
            <div className="flex justify-center items-center gap-1">
              {formatNumberWithCommas(treeItem?.each_cost)}
              <span className="text-[#28D16C] text-xs">تومان</span>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-3 border-b-2 border-b-[#E4E4E4]"></div>
    </>
  );
};

export default RightSideShoppingCart;
