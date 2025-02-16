"use client";
import { TreeComment } from "@/types/products";
import { FC } from "react";
import useSWRInfinite from "swr/infinite";
import { Button } from "@/components/ui/button";
import CommentLayout from "@/components/ui/commentLayout";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";
import ChildComment from "@/components/ui/childComment";
import { Fetcher } from "swr";

interface CommentPage {
  comments: TreeComment[];
}

export function useComments(
  productSlug: string,
  parentCommentApi: string,
  fetcher: Fetcher<CommentPage, string>
) {
  const getKey = (pageIndex: number, previousPageData: CommentPage | null) => {
    if (previousPageData && previousPageData.comments.length === 0) return null;

    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }${parentCommentApi}${productSlug}/?comment_offset=${pageIndex * 10}`;
  };

  return useSWRInfinite<CommentPage>(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
}

const CommentSection: FC = () => {
  const { userComment, productSlug, parentCommentApi, session } =
    useCommentAndChatSectionContext();

  const customFetcher = (url: string) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: session?.access ? `Bearer ${session.access}` : "",
        TOKEN: session?.token ?? "",
      },
    }).then((res) => res.json() as Promise<CommentPage>);

  const { data, setSize, size, isLoading } = useComments(
    productSlug || "",
    parentCommentApi,
    customFetcher
  );
  const currentPageData = data ? data[size - 1] : undefined;
  const previousPageData = data ? data[size - 2] : undefined;

  if (isLoading || currentPageData === undefined) {
    return (
      <div className="font-semibold text-[#28D16C] text-center my-3">
        درحال بارگیری
      </div>
    );
  }

  return (
    <>
      {userComment && (
        <div className="relative">
          <div className="opacity-40">
            <CommentLayout comment={userComment} />
          </div>
        </div>
      )}
      {currentPageData?.comments?.map((comment: TreeComment) => (
        <div key={comment.id}>
          <CommentLayout comment={comment} />
          {comment?.child_of_all.length > 0 && (
            <div className="relative border-2 z-10 mr-11 sm:mx-20 rounded-xl pe-3 bg-white border-[#EAEAEA]">
              <div className="border-r-2 -top-12 w-[40px] -right-10 sm:-right-14 border-dashed border-b-2 absolute border-[#EAEAEA] h-1/3"></div>
              <div>
                <ChildComment
                  childOfAll={comment.child_of_all}
                  parentCommentId={comment.id}
                  replyedTo={comment.user_username}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <div
        className={`mb-3 ${
          (!previousPageData && !currentPageData) ||
          (currentPageData?.comments?.length ?? 0) ===
            (previousPageData?.comments?.length ?? 0) ||
          currentPageData?.comments?.length < 10
            ? "hidden"
            : ""
        }`}
      >
        <Button
          disabled={
            (!previousPageData && !currentPageData) ||
            (currentPageData?.comments?.length ?? 0) ===
              (previousPageData?.comments?.length ?? 0) ||
            currentPageData?.comments?.length < 10
          }
          onClick={() => setSize(size + 1)}
          variant={"green"}
          size={"lg"}
          className="disabled:opacity-50 disabled:bg-gray-800 mt-4 "
        >
          {(!previousPageData && !currentPageData) ||
          (currentPageData?.comments?.length ?? 0) ===
            (previousPageData?.comments?.length ?? 0) ||
          currentPageData?.comments?.length < 10
            ? "پیغامی نیست"
            : "نمایش بیشتر"}
        </Button>
      </div>
    </>
  );
};

export default CommentSection;