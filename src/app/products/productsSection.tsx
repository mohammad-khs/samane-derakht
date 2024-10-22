"use client";

import Product from "@/components/products/product";
import { Button } from "@/components/ui/button";
import { Tree } from "@/types/products";
import { FC } from "react";
import useSWRInfinite from "swr/infinite";
import Loading from "./loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
interface ProductsSectionProps {}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useProducts() {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // If no previous data or no more pages to fetch
    if (previousPageData && previousPageData.length === 0) return null;
    return `https://treeone.liara.run/order/api/trees/?offset=${
      pageIndex + 14
    }`;
  };

  return useSWRInfinite(getKey, fetcher, { revalidateOnFocus: false });
}

const ProductsSection: FC<ProductsSectionProps> = () => {
  const { data, setSize, size, isLoading, error } = useProducts();

  if (isLoading && !data) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-red-500 py-10 text-center text-2xl h-full">
        لطفا چند لحظه صبر کنید
      </div>
    );
  }

  const currentPageData = data ? data[size - 1]?.data : [];
  const previousPageData = data ? data[size - 2]?.data : [];

  return (
    <>
      <div className="relative">
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {currentPageData && currentPageData.length > 0
            ? currentPageData.map((product: Tree) => (
                <div
                  className="flex justify-center items-center"
                  key={product.id}
                >
                  <Product
                    id={product?.id}
                    image={product?.image}
                    name={product?.name}
                    price={product?.price}
                    avg={product?.avg}
                    count={product?.count}
                    in_stock={product?.in_stock}
                    price_off={product?.price_off}
                    stock_number={product?.stock_number}
                  />
                </div>
              ))
            : previousPageData &&
              previousPageData.length > 0 &&
              previousPageData.map((product: Tree) => (
                <div
                  className="flex justify-center items-center"
                  key={product.id}
                >
                  <Product
                    id={product?.id}
                    image={product?.image}
                    name={product?.name}
                    price={product?.price}
                    avg={product?.avg}
                    count={product?.count}
                    in_stock={product?.in_stock}
                    price_off={product?.price_off}
                    stock_number={product?.stock_number}
                  />
                </div>
              ))}
          {/* {isLoading && (
            <div className="flex justify-center items-center">
              <Skeleton
                width={233}
                baseColor="#00000047"
                height={274}
                highlightColor="#D9D9D9"
                count={1}
              />
            </div>
          )} */}
        </div>

        {error && <div>{error.message}</div>}
        <div className="w-full my-4 mb-8 flex justify-center items-center">
          <Button
            disabled={
              !currentPageData ||
              (data &&
                data[size - 2]?.data?.length === data[size - 1]?.data?.length)
            }
            onClick={() => setSize(size + 1)}
            variant={"green"}
            size={"lg"}
            className="disabled:opacity-50 disabled:bg-gray-800"
          >
            نمایش بیشتر
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductsSection;
