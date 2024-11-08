"use client";
import { TreeComment } from "@/types/products";
import { FC } from "react";

import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CommentLayout from "@/components/ui/commentLayout";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";

interface CommentSectionProps {}

export function useComments(productId: string) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // If no previous data (initial fetch), fetch 12 items
    // if (pageIndex === 0 && previousPageData === null) {
    //   return null;
    // }

    // If no more data to fetch
    if (previousPageData && previousPageData.length === 0) return null;

    // For subsequent pages, fetch 4 items
    return `https://treeone.liara.run/order/api/tree/${productId}/?comment_offset=${
      (1 + pageIndex) * 10
    }`;
  };

  return useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
}

const CommentSection: FC<CommentSectionProps> = ({}) => {
  const { comments, userComment, productId, textareaRef } =
    useCommentAndChatSectionContext();
  const { data, setSize, size, isLoading, error } = useComments(productId);
  const currentPageData = data ? data[size - 1] : [];
  const previousPageData = data ? data[size - 2] : [];
  if (isLoading) {
    return (
      <div className="font-semibold text-[#28D16C] text-center my-3">
        درحال بارگیری
      </div>
    );
  }

  if (size === 1) {
    return (
      <>
        {userComment && (
          <div className="relative">
            <div className="opacity-40">
              <CommentLayout comment={userComment} />
            </div>

            
          </div>
        )}
        {comments?.map((comment: TreeComment) => (
          <div key={comment.id}>
            <CommentLayout comment={comment} />
            {comment.child && comment.child.length > 0 && (
              <div className="relative border-2 z-10 mr-11 sm:mx-20 rounded-xl pe-3 bg-white border-[#EAEAEA]">
                <div className="border-r-2 -top-12 w-[40px] -right-10 sm:-right-14 border-dashed border-b-2 absolute border-[#EAEAEA] h-1/3"></div>
                {comment.child.map((childComment: TreeComment) => (
                  <div className="" key={childComment.id}>
                    <CommentLayout
                      replyedTo={comment.user_username}
                      key={childComment.id}
                      childComment={childComment}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button
          onClick={() => setSize(size + 1)}
          variant={"green"}
          size={"lg"}
          className="disabled:opacity-50 disabled:bg-gray-800"
        >
          نمایش بیشتر
        </Button>
      </>
    );
  } else if (data && size > 1) {
    // this is how i access the comments in data
    const comments = data[0][2].comments;

    return (
      <>
        {userComment && (
          <div className="relative">
            <div className="opacity-40">
              <CommentLayout comment={userComment} />
            </div>

            
          </div>
        )}
        {comments?.map((comment: TreeComment) => (
          <div key={comment.id}>
            <CommentLayout comment={comment} />
            {comment.child && comment.child.length > 0 && (
              <div className="relative border-2 z-10 mr-11 sm:mx-20 rounded-xl pe-3 bg-white border-[#EAEAEA]">
                <div className="border-r-2 -top-12 w-[40px] -right-10 sm:-right-14 border-dashed border-b-2 absolute border-[#EAEAEA] h-1/3"></div>
                {comment.child.map((childComment: TreeComment) => (
                  <div className="" key={childComment.id}>
                    <CommentLayout
                      replyedTo={comment.user_username}
                      key={childComment.id}
                      childComment={childComment}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button
          disabled={
            !currentPageData ||
            currentPageData[2].length === previousPageData[2].length
          }
          onClick={() => setSize(size + 1)}
          variant={"green"}
          size={"lg"}
          className="disabled:opacity-50 disabled:bg-gray-800"
        >
          {!currentPageData ||
          currentPageData[2].length === previousPageData[2].length
            ? "پیغامی نیست"
            : "نمایش بیشتر"}
        </Button>
      </>
    );
  }
};

export default CommentSection;
