"use client";

import { FC } from "react";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";
import { Button } from "@/components/ui/button";
import { DateFormatDMY } from "@/helper/dateHandler";
import { TreeComment } from "@/types/products";
import { ReplyIcon } from "lucide-react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { handleReply } from "@/lib/utils";
import LikeDislikeButtons from "./LikeDislikeButtons";

interface CommentLayoutProps {
  comment?: TreeComment;
}

const CommentLayout: FC<CommentLayoutProps> = ({ comment }) => {
  const {
    textareaRef,
    setcommentToreplyId,
    setCommentToReplyUsername,
    setProfileId,
    session,
    isInTree,
  } = useCommentAndChatSectionContext();

  if (!comment) return null;

  return (
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
                return dateInfo
                  ? `${dateInfo.day}/${dateInfo.month}/${dateInfo.year}`
                  : null;
              })()}
            </div>
          )}
        </div>

        <LikeDislikeButtons
          isInTree={isInTree}
          commentId={comment.id}
          initialLikeCount={comment.likes_count}
          initialDislikeCount={comment.dislikes_count}
          has_user_disliked={comment.has_user_disliked}
          has_user_liked={comment.has_user_liked}
          session={session}
        />
      </div>

      <div className="flex w-full flex-col">
        <div className="text-xl sm:text-2xl font-semibold">
          {comment.user_username || "کاربر ناشناس"}
        </div>
        <div className="text-[#757575] overflow-x-auto overflow-clip text-xs sm:text-sm">
          {comment.text}
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
                comment,
                setProfileId,
                comment.id
              )
            }
          >
            <ReplyIcon className="text-[#22C563]" />
            پاسخ به کاربر
          </Button>
        </div>
      </div>

      <div className="justify-end flex w-full sm:block sm:w-auto">
        <div className="relative h-16 w-16 rounded-full  flex justify-center items-center  bg-[#EAEAEA]">
          {comment.user_profileimage ? (
            <div className="relative h-14 w-14">
              <Image
              alt={`پروفایل ${comment.user_username}`}
              fill
              className="w-full h-full rounded-full"
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${comment.user_profileimage}`}
              style={{ objectFit: "cover" }}
            />
            </div>
          ) : (
            <FaUser className="h-8 w-8 text-[#5F6368] rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentLayout;
