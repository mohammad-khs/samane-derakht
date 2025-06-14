import { TreeCard } from "@/types/products";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";

const ProductCard: FC<TreeCard> = ({
  image,
  in_stock,
  name,
  price,
  price_off,
  slug,
}) => {
  return (
    <>
      <Link
        href={`products/${encodeURIComponent(slug || "")}`}
        aria-disabled={!in_stock}
        className="relative rounded-lg bg-white hover:bg-[#20AC58CC] transition-colors aria-disabled:bg-[#00000047] aria-disabled:opacity-80 group"
      >
        <div
          className={`w-[233px] rounded-lg h-[274px] px-2 flex flex-col ${
            in_stock && `group-hover:opacity-60`
          }`}
        >
          <div className="relative w-full h-full mt-2 flex justify-center items-center rounded-lg bg-[#d4cec9]">
            {image ? (
              <Image
                className="rounded-lg"
                alt={`تصویر ${name}`}
                fill
                src={`${image}`}
              />
            ) : (
              <div className="relative h-16 w-32">
                <Image alt="no pictures found" fill src={"/icon.png"} />
              </div>
            )}
          </div>
          <div className="flex flex-col my-3 justify-center">
            <div className="truncate text-center font-extrabold">{name}</div>
            <div
              className="text-center my-2 flex justify-center items-center gap-1"
              style={{ direction: "rtl" }}
            >
              {price_off != price && (
                <span className="text-[#E14444] text-xs line-through">
                  {formatNumberWithCommas(price)}
                </span>
              )}
              <div>
                <span className="">{formatNumberWithCommas(price_off)}</span>{" "}
                <span className="text-[#979797] text-xs">تومان</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        {in_stock ? (
          <div className="flex absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity w-full h-full justify-center items-center">
            <Button
              variant={"secondary"}
              className="hover:bg-white bg-white opacity-100"
            >
              جزئیات و ثبت سفارش
            </Button>
          </div>
        ) : (
          <div className="flex top-0 left-0 absolute w-full h-full justify-center items-center">
            <Button className="bg-black">ناموجود</Button>
          </div>
        )}
      </Link>
    </>
  );
};

export default ProductCard;
