"use client";

import { FC, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/utils";
import { TreeChildComment } from "@/types/products";
import ChildCommentLayout from "./childCommentLayout";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";

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
  childCommentApi: string
) {
  const getKey = (pageIndex: number, previousPageData: CurrentPageDataType) => {
    if (!triggerFetch) return null;
    if (previousPageData && previousPageData.data.length === 0) return null;
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }${childCommentApi}${productId}/?child_offset=${pageIndex * 5 + 5}`;
  };
  return useSWRInfinite(getKey, fetcher, {
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
  const { childCommentApi } = useCommentAndChatSectionContext();
  const { data, setSize, size, isLoading } = useChildComments(
    parentCommentId || "",
    triggerFetch,
    childCommentApi
  );

  const currentPageData: CurrentPageDataType = data
    ? data[size - 1]
    : { child_offset: 0, data: [] };
  const previousPageData: CurrentPageDataType = data
    ? data[size - 2]
    : { child_offset: 0, data: [] };

  if (isLoading) {
    return (
      <div className="font-semibold text-[#28D16C] text-center my-3">
        درحال بارگیری
      </div>
    );
  }

  if (childOfAll.length > 0 && triggerFetch === false) {
    return (
      <>
        <ChildCommentLayout
          childOfAll={childOfAll}
          replyedTo={replyedTo}   
          currentPageData={currentPageData}
          previousPageData={previousPageData}
          setSize={setSize}
          size={size}
          parentCommentId={parentCommentId}
          setTriggerFetch={setTriggerFetch}
        />
      </>
    );
  }

  if (triggerFetch) {
    return (
      <>
        <ChildCommentLayout
          childOfAll={currentPageData?.data}
          replyedTo={replyedTo}
          currentPageData={currentPageData}
          previousPageData={previousPageData}
          setSize={setSize}
          size={size}
          setTriggerFetch={setTriggerFetch}
          parentCommentId={parentCommentId}
        />
      </>
    );
  }
};

export default ChildComment;
