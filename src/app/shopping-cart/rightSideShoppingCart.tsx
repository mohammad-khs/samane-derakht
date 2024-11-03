import { FallbackImage } from "@/components/products/product/headerImages";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { FaCommentAlt, FaStar } from "react-icons/fa";

interface RightSideShoppingCartProps {}

const RightSideShoppingCart: FC<RightSideShoppingCartProps> = () => {
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount((prev) => (prev += 1));
  };
  const handleDecrement = () => {
    setCount((prev) => (prev -= 1));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row " style={{ direction: "rtl" }}>
        <div>
          <div className="relative">
            {false ? (
              <Image
                src={"/svgs/heroCity.svg"}
                alt="hero city"
                width={0}
                height={0}
                className="w-full h-auto"
              />
            ) : (
              <div className="border-2 rounded-lg border-[#D2D2D2] p-[2px] w-[188px] h-[140px]">
                {FallbackImage()}
              </div>
            )}
          </div>
        </div>
        <div className="mx-3">
          <h1 className="text-xl mt-3 font-semibold">
            نهال درخت کاج{" "}
            <span className="text-[#247C48] underline text-xs">
              مشاهده محصول
            </span>
          </h1>
          <div className="flex my-2 justify-start gap-3 mx-1">
            <div className="mt-auto">
              <div className=" flex justify-center items-center gap-2">
                <span className="text-[#797979]">کامنت</span>
                <span>{/* {treeData.commnet_count} */}5</span>
                <FaCommentAlt className="text-[#C0C0C0]" />
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex justify-center items-center gap-2">
                <span className="text-[#797979]">امتیاز</span>
                <span>
                  {/* {treeData.avg?.toFixed(1) ||
                    treeData.tree?.avg?.toFixed(1) ||
                    0} */}
                  4.8
                </span>
                <FaStar className="text-[#F2B93B] mb-1" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 md:gap-28 lg:gap-36 mt-5 justify-between">
            <div className="flex gap-3 justify-around items-center text-lg  px-2 py-1 rounded-lg border-2 border-[#28D16C]">
              <button onClick={handleIncrement}>
                <Plus className="text-[#848484]" />
              </button>
              <div className="mx-5">{count}</div>
              <button onClick={handleDecrement}>
                <Minus className="text-[#848484]" />
              </button>
            </div>
            <div className="flex justify-center items-center gap-1">
              1,900,000
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
