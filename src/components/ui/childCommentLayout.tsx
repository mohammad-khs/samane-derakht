import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "./button";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { ReplyIcon } from "lucide-react";
import { handleReply } from "@/lib/utils";
import { DateFormatDMY } from "@/helper/dateHandler";
import { TreeChildComment } from "@/types/products";
import { useCommentAndChatSectionContext } from "@/app/products/[productName]/commentAndChatSection";
import LikeDislikeButtons from "./LikeDislikeButtons";

interface ChildCommentLayoutProps {
  childOfAll: TreeChildComment[];
  replyedTo: string;
  setSize: Dispatch<SetStateAction<number>>;
  previousPageData: { data: TreeChildComment[] } | undefined;
  size: number;
  setTriggerFetch: Dispatch<SetStateAction<boolean>>;
  parentCommentId: string | undefined;
}

const ChildCommentLayout: FC<ChildCommentLayoutProps> = ({
  replyedTo,
  childOfAll,
  setSize,
  previousPageData,
  size,
  parentCommentId,
  setTriggerFetch,
}) => {
  const {
    setcommentToreplyId,
    setCommentToReplyUsername,
    textareaRef,
    setProfileId,
    session,
    isInTree,
  } = useCommentAndChatSectionContext();

  return (
    <>
      <div>
        {childOfAll?.map((childComment: TreeChildComment) => (
          <div key={childComment?.id}>
            <div className="flex flex-col-reverse ms-4 sm:flex-row items-start gap-4 justify-end my-5 rounded-lg">
              <div className="flex flex-col gap-6 items-start me-auto justify-between h-full">
                <div className="text-sm">
                  {childComment?.irani && (
                    <div>
                      {(() => {
                        const dateInfo = DateFormatDMY(childComment.irani);
                        return dateInfo
                          ? `${dateInfo.day}/${dateInfo.month}/${dateInfo.year}`
                          : null;
                      })()}
                    </div>
                  )}
                </div>

                <LikeDislikeButtons
                  isInTree={isInTree}
                  commentId={childComment.id}
                  initialLikeCount={childComment.likes_count}
                  initialDislikeCount={childComment.dislikes_count}
                  has_user_disliked={childComment.has_user_disliked}
                  has_user_liked={childComment.has_user_liked}
                  session={session}
                />
              </div>

              <div className="flex flex-col w-full">
                <div className="text-xl sm:text-2xl font-semibold">
                  {childComment?.user_username ? (
                    <div className="flex gap-2 justify-end items-center">
                      <span className="text-xs text-[##3D3D3D]">
                        ( در پاسخ به کاربر {replyedTo})
                      </span>
                      <div>{childComment?.user_username}</div>
                    </div>
                  ) : (
                    <div className="">کاربر ناشناس</div>
                  )}
                </div>

                <div className="text-[#757575] text-sm">
                  {childComment?.text}
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
                        childComment,
                        setProfileId,
                        parentCommentId
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
                  {childComment.user_profileimage ? (
                    <div className="relative h-14 w-14">
                      <Image
                        alt={`پروفایل ${childComment.user_username}`}
                        fill
                        className="w-full h-full rounded-full"
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${childComment.user_profileimage}`}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <FaUser className="h-8 w-8 text-[#5F6368] rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mb-3 ${
          !childOfAll ||
          childOfAll?.length === previousPageData?.data.length ||
          childOfAll.length < 5
            ? "hidden"
            : ""
        }`}
      >
        <Button
          onClick={() => {
            setTriggerFetch(true);
            setSize(size + 1);
          }}
          variant={"green"}
          disabled={
            !childOfAll ||
            childOfAll?.length === previousPageData?.data.length ||
            childOfAll.length < 5
          }
          size={"lg"}
          className="disabled:opacity-50 disabled:bg-gray-800 mt-3"
        >
          {!childOfAll ||
          childOfAll?.length === previousPageData?.data.length ||
          childOfAll.length < 5
            ? "پیغامی نیست"
            : "نمایش بیشتر"}
        </Button>
      </div>
    </>
  );
};

export default ChildCommentLayout;