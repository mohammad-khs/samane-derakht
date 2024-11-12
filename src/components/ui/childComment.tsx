import {
  AlertOctagonIcon,
  ReplyIcon,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Button } from "./button";
import { DateFormatDMY } from "@/helper/dateHandler";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import useSWRInfinite from "swr/infinite";
import { fetcher, handleReply } from "@/lib/utils";
import { TreeComment } from "@/types/products";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";

interface ChildCommentProps {
  commentId: string | undefined;
  replyedTo: string;
}

interface ChildComment {
  child_offset: number;
  data: TreeComment[];
}

export function useChildComments(productId: string) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // If no more data to fetch
    if (previousPageData && previousPageData.length === 0) return null;

    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/order/api/child/${productId}/?child_offset=${pageIndex * 5}`;
  };

  return useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
}

const ChildComment: FC<ChildCommentProps> = ({ commentId, replyedTo }) => {
  const { setcommentToreplyId, setCommentToReplyUsername, textareaRef } =
    useCommentAndChatSectionContext();
  const { data, setSize, size, isLoading, error } = useChildComments(
    commentId || ""
  );

  const currentPageData = data ? data[size - 1] : [];
  const previousPageData = data ? data[size - 2] : [];

  if (isLoading) {
    return (
      <div className="font-semibold text-[#28D16C] text-center my-3">
        درحال بارگیری
      </div>
    );
  }
  if (size >= 1) {
    return (
      <>
        <div>
          {data &&
            currentPageData?.data.map((comment: TreeComment) => (
              <div key={comment?.id}>
                <div className="flex flex-col-reverse ms-4 sm:flex-row items-start gap-4 justify-end my-5 rounded-lg">
                  <div className="flex flex-col gap-6 items-start me-auto justify-between h-full">
                    <div className="text-sm">
                      {comment?.irani && (
                        <div>
                          {(() => {
                            const dateInfo = DateFormatDMY(comment.irani);
                            if (dateInfo) {
                              return (
                                <>
                                  {dateInfo.day}/{dateInfo.month}/
                                  {dateInfo.year}
                                </>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      )}
                    </div>
                    <div className="mt-auto flex gap-4">
                      <ThumbsDown className="text-[#909090] w-5 h-5" />
                      <ThumbsUp className="text-[#909090] w-5 h-5" />
                      <AlertOctagonIcon className="text-[#909090] w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="text-xl sm:text-2xl font-semibold">
                      {comment?.user_username ? (
                        <>
                          <div className="flex gap-2 justify-end items-center">
                            <span className="text-xs text-[##3D3D3D]">
                              ( در پاسخ به کاربر {replyedTo})
                            </span>
                            <div>{comment?.user_username}</div>
                          </div>
                        </>
                      ) : (
                        <div className="">کاربر ناشناس</div>
                      )}
                    </div>

                    <div className="text-[#757575] text-sm">
                      {comment?.text}
                    </div>
                    <div>
                      <Button
                        className="text-[#757575] gap-1 my-3"
                        size={"sm"}
                        variant={"secondary"}
                        onClick={() =>
                          handleReply(
                            textareaRef,
                            setcommentToreplyId,
                            setCommentToReplyUsername,
                            comment
                          )
                        }
                      >
                        <ReplyIcon className="text-[#22C563]" />
                        پاسخ به کاربر
                      </Button>
                    </div>
                  </div>
                  <div className="justify-end flex w-full sm:block sm:w-auto">
                    <div className="relative rounded-full p-2 sm:p-4 bg-[#EAEAEA]">
                      {comment?.user_profileimage ? (
                        <Image
                          alt={`پروفایل ${comment?.user_username}`}
                          fill
                          src={`${comment?.user_profileimage}`}
                        />
                      ) : (
                        <FaUser className="h-7 w-7 text-[#5F6368]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div hidden={currentPageData?.data.length === 0} className="mb-3">
            <Button
              onClick={() => setSize(size + 1)}
              variant={"green"}
              disabled={
                !currentPageData ||
                currentPageData?.data.length === previousPageData?.data.length
              }
              size={"lg"}
              className="disabled:opacity-50 disabled:bg-gray-800 mt-3"
            >
              نمایش بیشتر
            </Button>
          </div>
        </div>
      </>
    );
  }
};

export default ChildComment;
