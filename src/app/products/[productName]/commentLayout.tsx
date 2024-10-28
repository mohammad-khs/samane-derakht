import { Button } from "@/components/ui/button";
import { DateFormatDMY } from "@/helper/dateHandler";
import { Comment } from "@/types/products";
import {
  AlertOctagonIcon,
  ReplyIcon,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { FaUser } from "react-icons/fa";

interface CommentLayoutProps {
  comment?: Comment;
  childComment?: Comment;
  replyedTo?: string;
}

const CommentLayout: FC<CommentLayoutProps> = ({
  comment,
  childComment,
  replyedTo,
}) => {
  if (comment) {
    return (
      <>
        <div
          className="flex flex-col-reverse sm:flex-row items-start gap-4 justify-end my-5"
          key={comment.id}
        >
          <div className="flex flex-col gap-6 items-start me-auto justify-between h-full">
            <div className="text-sm">
              {comment?.irani && (
                <div>
                  {(() => {
                    const dateInfo = DateFormatDMY(comment.irani);
                    if (dateInfo) {
                      return (
                        <>
                          {dateInfo.day}/{dateInfo.month}/{dateInfo.year}
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

          <div className="flex flex-col">
            <div className="text-xl sm:text-2xl font-semibold">
              {comment.user_username ? (
                <div>{comment.user_username}</div>
              ) : (
                <div className="">کاربر ناشناس</div>
              )}
            </div>
            <div className="text-[#757575] text-xs sm:text-sm">
              {comment.text}
            </div>
            <div>
              <Button
                className="text-[#757575] gap-1 my-3"
                size={"sm"}
                variant={"secondary"}
              >
                <ReplyIcon className="text-[#22C563]" />
                پاسخ به کاربر
              </Button>
            </div>
          </div>
          <div className="justify-end flex w-full sm:block sm:w-auto">
            <div className="relative  rounded-full p-2 sm:p-4 bg-[#EAEAEA]">
              {comment.user_profileimage ? (
                <Image
                  alt={`پروفایل ${comment.user_username}`}
                  fill
                  src={`${comment.user_profileimage}`}
                />
              ) : (
                <FaUser className="h-7 w-7 text-[#5F6368]" />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="flex flex-col-reverse ms-4 sm:flex-row items-start gap-4 justify-end my-5 rounded-lg"
        key={childComment?.id}
      >
        <div className="flex flex-col gap-6 items-start me-auto justify-between h-full">
          <div className="text-sm">
            {childComment?.irani && (
              <div>
                {(() => {
                  const dateInfo = DateFormatDMY(childComment.irani);
                  if (dateInfo) {
                    return (
                      <>
                        {dateInfo.day}/{dateInfo.month}/{dateInfo.year}
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
            {childComment?.user_username ? (
              <>
                <div className="flex gap-2 justify-end items-center">
                  <span className="text-xs text-[##3D3D3D]">
                    ( در پاسخ به کاربر {replyedTo})
                  </span>
                  <div>{childComment?.user_username}</div>
                </div>
              </>
            ) : (
              <div className="">کاربر ناشناس</div>
            )}
          </div>
          <div className="text-[#757575] text-sm">{childComment?.text}</div>
          <div>
            <Button
              className="text-[#757575] gap-1 my-3"
              size={"sm"}
              variant={"secondary"}
            >
              <ReplyIcon className="text-[#22C563]" />
              پاسخ به کاربر
            </Button>
          </div>
        </div>
        <div className="justify-end flex w-full sm:block sm:w-auto">
          <div className="relative rounded-full p-2 sm:p-4 bg-[#EAEAEA]">
            {childComment?.user_profileimage ? (
              <Image
                alt={`پروفایل ${childComment?.user_username}`}
                fill
                src={`${childComment?.user_profileimage}`}
              />
            ) : (
              <FaUser className="h-7 w-7 text-[#5F6368]" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentLayout;
