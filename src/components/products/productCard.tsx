import { TreeCard } from "@/types/products";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";
import { formatNumberWithCommas } from "@/helper/formatNumberWithCommas";

interface ProductCardProps extends TreeCard { }

const ProductCard: FC<ProductCardProps> = ({
  image,
  in_stock,
  name,
  price,
  price_off,
  id,
  slug
}) => {
  // href={`products/${encodeURIComponent(name).replace(/%20/g, "-")}`}
  return (
    <>
      <Link
        href={`products/${slug}`}
        aria-disabled={!in_stock}
        className="relative rounded-lg bg-white hover:bg-[#20AC58CC] transition-colors aria-disabled:bg-[#00000047] aria-disabled:opacity-80 group"
      >
        <div
          className={`w-[233px] rounded-lg h-[274px] px-2 flex flex-col ${in_stock && `group-hover:opacity-60`
            }`}
        >
          <div className="relative w-full h-full mt-2 flex justify-center items-center rounded-lg bg-slate-600">
            {image ? (
              <Image
                className="rounded-lg"
                alt={`تصویر ${encodeURIComponent(name)}`}
                fill
                src={`${image}`}
              />
            ) : (
              <Frown className="h-10 w-10 text-white" />
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
