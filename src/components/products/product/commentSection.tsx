"use client";
import { TreeComment } from "@/types/products";
import { FC, useState } from "react";

import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CommentLayout from "@/components/ui/commentLayout";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";
import ChildComment from "@/components/ui/childComment";

interface CommentSectionProps {}

export function useComments(productSlug: string) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // If no more data to fetch
    if (previousPageData && previousPageData.length === 0) return null;

    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/order/api/tree/${productSlug}/?comment_offset=${pageIndex * 10}`;
  };

  return useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
}

const CommentSection: FC<CommentSectionProps> = ({}) => {
  const { comments, userComment, productId, productSlug, textareaRef } =
    useCommentAndChatSectionContext();
  const { data, setSize, size, isLoading, error } = useComments(
    productSlug || ""
  );
  const currentPageData = data ? data[size - 1] : [];
  const previousPageData = data ? data[size - 2] : [];


  if (isLoading || currentPageData === undefined) {
    return (
      <div className="font-semibold text-[#28D16C] text-center my-3">
        درحال بارگیری
      </div>
    );
  }

  if (size >= 1) {
    return (
      <>
        {userComment && (
          <div className="relative">
            <div className="opacity-40">
              <CommentLayout comment={userComment} />
            </div>
          </div>
        )}
        {currentPageData?.[2]?.comments?.map((comment: TreeComment) => (
          <div key={comment.id}>
            <CommentLayout comment={comment} />
            {comment?.count_of_child > 0 && (
              <div className="relative border-2 z-10 mr-11 sm:mx-20 rounded-xl pe-3 bg-white border-[#EAEAEA]">
                <div className="border-r-2 -top-12 w-[40px] -right-10 sm:-right-14 border-dashed border-b-2 absolute border-[#EAEAEA] h-1/3"></div>
                <div>
                  <ChildComment
                    commentId={comment.id}
                    replyedTo={comment.user_username}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <Button
          disabled={
            (!previousPageData && !currentPageData) ||
            (currentPageData?.[2].comments?.length ?? 0) ===
              (previousPageData?.[2].comments?.length ?? 0)
          }
          onClick={() => setSize(size + 1)}
          variant={"green"}
          size={"lg"}
          className="disabled:opacity-50 disabled:bg-gray-800"
        >
          {(!previousPageData && !currentPageData) ||
          (currentPageData?.[2].comments?.length ?? 0) ===
            (previousPageData?.[2].comments?.length ?? 0)
            ? "پیغامی نیست"
            : "نمایش بیشتر"}
        </Button>
      </>
    );
  }
};

export default CommentSection;
