"use client";

import { Button } from "@/components/ui/button";
import { TreeCard } from "@/types/products";
import { FC } from "react";
import useSWRInfinite from "swr/infinite";
import Loading from "./productsLoading";
import axios from "axios";
import ProductCard from "@/components/products/productCard";
import { fetcher } from "@/lib/utils";
import { Loader2 } from "lucide-react";
interface ProductsSectionProps {}

export function useProducts() {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // If no previous data (initial fetch), fetch 12 items
    if (pageIndex === 0 && previousPageData === null) {
      return `https://treeone.liara.run/order/api/trees/?offset=12`;
    }

    // If no more data to fetch
    if (previousPageData && previousPageData.length === 0) return null;

    // For subsequent pages, fetch 4 items
    return `https://treeone.liara.run/order/api/trees/?offset=${
      12 + pageIndex * 4
    }`;
  };

  return useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
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
            ? currentPageData.map((product: TreeCard) => (
                <div
                  className="flex justify-center items-center"
                  key={product.id}
                >
                  <ProductCard
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
              previousPageData.map((product: TreeCard) => (
                <div
                  className="flex justify-center items-center"
                  key={product.id}
                >
                  <ProductCard
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
        </div>

        {error && <div>{error.message}</div>}
        <div className="w-full my-4 mb-8 flex justify-center items-center">
          {isLoading ? (
            <Loader2 className="text-white animate-spin" />
          ) : (
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
              {data &&
              data[size - 2]?.data?.length === data[size - 1]?.data?.length
                ? "چیزی برای نمایش نیست"
                : "نمایش بیشتر"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsSection;
