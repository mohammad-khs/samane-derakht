"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import useSWRInfinite from "swr/infinite";
import { FC } from "react";
import MyTreesSection from "./myTreesSection";
import { Button } from "@/components/ui/button";

interface MyTreesProps {
  session: Session;
}

export interface MyTreeItem {
  id: string;
  tree_name: string;
  scan_numbers: number;
  allowed_to_ask_for_status: boolean | string;
  button_status: boolean;
  city_name: string;
  latitud: string;
  location_name: string;
  longtitud: string;
  order_custom_id: string;
  price: number;
  province_name: string;
  show_status_message: null | string;
  tree_type_image: string;
  tree_type_slug: string;
}

interface MyTrees {
  data: MyTreeItem[];
  offset: number;
}

export const fetcher = (url: string, session: Session) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${session?.access}`,
        TOKEN: session?.token,
      },
    })
    .then((res) => res.data);

const MyTrees: FC<MyTreesProps> = ({ session }) => {
  const getKey = (pageIndex: number, previousPageData: { data: [] }) => {
    // If no previous data (initial fetch), start fetching
    if (pageIndex === 0 && previousPageData === null) {
      return `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/api/mytrees/?limit=12`;
    }

    // If no more data to fetch
    if (previousPageData && previousPageData.data.length === 0) return null;

    // For subsequent pages, fetch more items
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/account/api/mytrees/?limit=12&offset=${pageIndex * 5}`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData),
    (url) => fetcher(url, session),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const currentData = data ? data[size - 1] : [];
  const previousData = data ? data[size - 2] : [];

  if (isLoading) {
    return (
      <div className="w-full h-full justify-center items-center flex">
        <Loader2 className="animate-spin w-20 h-20 text-[#28D16C]" />
      </div>
    );
  }

  return (
    <>
      <div>
        {data && data.some((page) => page.data && page.data.length > 0) ? (
          data?.[data.length - 1].data?.map((treeItem: MyTreeItem) => (
            <MyTreesSection
              key={treeItem.id}
              item={treeItem}
              session={session}
            />
          ))
        ) : (
          <p className="font-semibold mt-8 text-[#373737]">
            درخت های شما بعد از کاشته شدن به این جا اضافه خواهند شد
          </p>
        )}
      </div>
      {error && error?.status === 429 ? (
        <div className="text-red-600 text-center my-3">
          لطفا کمی صبر کنید...
        </div>
      ) : (
        <div className="text-red-600 text-center my-3">{error?.message}</div>
      )}
      <div
        className={`text-center mt-8 ${
          !currentData?.data ||
          currentData?.data?.length === previousData?.data?.length ||
          currentData?.data?.length < 7
            ? "hidden"
            : ""
        }`}
      >
        {
          <Button
            disabled={
              !currentData?.data ||
              currentData?.data?.length === previousData?.data?.length
            }
            className="disabled:bg-slate-500"
            variant={"green"}
            onClick={() => setSize((prev) => prev + 1)}
          >
            نمایش بیشتر
          </Button>
        }
      </div>
    </>
  );
};

export default MyTrees;
