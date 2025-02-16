"use client";
import { FC, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { TreeChildComment } from "@/types/products";
import ChildCommentLayout from "./childCommentLayout";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";
import { Fetcher } from "swr";

interface ChildCommentProps {
  parentCommentId: string | undefined;
  replyedTo: string;
  childOfAll: TreeChildComment[];
}

interface CurrentPageDataType {
  child_offset: number;
  data: TreeChildComment[];
}

export function useChildComments(
  productId: string,
  triggerFetch: boolean,
  childCommentApi: string,
  fetcher: Fetcher<CurrentPageDataType, string>
) {
  const getKey = (
    pageIndex: number,
    previousPageData: CurrentPageDataType | null
  ) => {
    if (!triggerFetch) return null;
    if (previousPageData && previousPageData.data.length === 0) return null;
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }${childCommentApi}${productId}/?child_offset=${pageIndex * 5 + 5}`;
  };

  return useSWRInfinite<CurrentPageDataType>(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
}

const ChildComment: FC<ChildCommentProps> = ({
  parentCommentId,
  replyedTo,
  childOfAll,
}) => {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { childCommentApi, session } = useCommentAndChatSectionContext();

  const customFetcher = (url: string) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: session?.access ? `Bearer ${session.access}` : "",
        TOKEN: session?.token ?? "",
      },
    }).then((res) => res.json() as Promise<CurrentPageDataType>);

  const { data, setSize, size, isLoading } = useChildComments(
    parentCommentId || "",
    triggerFetch,
    childCommentApi,
    customFetcher
  );

  const currentPageData: CurrentPageDataType = data?.[size - 1] || {
    child_offset: 0,
    data: [],
  };
  const previousPageData: CurrentPageDataType = data?.[size - 2] || {
    child_offset: 0,
    data: [],
  };

  if (isLoading) {
    return (
      <div className="font-semibold text-[#28D16C] text-center my-3">
        درحال بارگیری
      </div>
    );
  }

  return (
    <ChildCommentLayout
      childOfAll={triggerFetch ? currentPageData?.data : childOfAll}
      replyedTo={replyedTo}
      previousPageData={previousPageData}
      setSize={setSize}
      size={size}
      parentCommentId={parentCommentId}
      setTriggerFetch={setTriggerFetch}
    />
  );
};

export default ChildComment;
