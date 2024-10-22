import { Tree } from "@/types/products";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";

interface ProductProps extends Tree {}

const Product: FC<ProductProps> = ({
  avg,
  count,
  id,
  image,
  in_stock,
  name,
  price,
  price_off,
  stock_number,
}) => {
  return (
    <>
      <Link
        href={"#"}
        aria-disabled={!in_stock}
        className="relative disabled:bg-[#00000047] disabled:opacity-80 "
      >
        <div
          className={`w-[233px] h-[274px] px-4 flex flex-col transition-colors ${
            in_stock && `bg-white hover:bg-[#20AC58CC] hover:opacity-80`
          }`}
        >
          <div className="relative w-full h-full flex justify-center items-center bg-slate-600">
            {image ? (
              <Image alt={`تصویر ${name}`} fill src={`${image}`} />
            ) : (
              <Frown className="h-10 w-10 text-white" />
            )}
          </div>
          <div className="flex flex-col my-3 justify-center">
            <div className="truncate text-center font-semibold">{name}</div>
            <div
              className="text-center my-2 flex justify-center items-center gap-1"
              style={{ direction: "rtl" }}
            >
              {price_off != price && (
                <span className="text-[#E14444] text-xs line-through">
                  {price}
                </span>
              )}
              <div>
                <span className="font-semibold">{price_off}</span>{" "}
                <span className="text-[#979797] text-xs">تومان</span>
              </div>
            </div>
          </div>
          {in_stock ? (
            <div className="flex absolute top-0 left-0 opacity-0 hover:opacity-100 transition-all w-full z-50 h-full justify-center items-center">
              <Button variant={"secondary"} className="hover:bg-white bg-white">
                جزئیات و ثبت سفارش
              </Button>
            </div>
          ) : (
            <div className="flex top-0 left-0 absolute w-full z-50 h-full justify-center items-center">
              <Button className="cursor-auto">ناموجود</Button>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default Product;
